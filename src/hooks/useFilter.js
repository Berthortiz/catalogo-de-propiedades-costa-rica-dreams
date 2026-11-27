import { useContext, useMemo } from "react"
import { FiltersContext } from "../contexts/FiltersContext"
import { getCity, getProvince } from "../utils/citySlug"

/* ============================================================
   Constantes de negocio
   ============================================================ */

// Ancho de cada rango de precio del catálogo (en USD)
const PRICE_STEP = 500

// Cuántas propiedades aleatorias se sugieren cuando ningún filtro coincide
const SIMILAR_FALLBACK_COUNT = 3
const FILTER_PROVINCES = ["San José"]

const getFilterProvince = (product) => {
    const province = getProvince(product)
    return province === "Heredia" ? "San José" : province
}

const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
})

/* ============================================================
   Utilidades de datos (funciones puras)
   ============================================================ */

// Genera los rangos de precio a partir del precio más bajo y más alto del
// catálogo, en escalones de PRICE_STEP. Los extremos se redondean hacia
// afuera a la grilla del paso, de modo que los rangos se adaptan solos
// al crecer o cambiar los datos.
//
//   Ejemplo (mín $4,500 / máx $8,000, paso $500):
//     Hasta $5,000 / $5,000 – $5,500 / … / $7,000 – $7,500 / Más de $7,500
function buildPriceTiers(minPrice, maxPrice) {
    if (!Number.isFinite(maxPrice) || maxPrice <= 0) return []

    const step = PRICE_STEP
    const lowest = Number.isFinite(minPrice) && minPrice > 0 ? minPrice : 0
    const start = Math.max(0, Math.floor(lowest / step) * step) // 4500 → 4500
    const end = Math.ceil(maxPrice / step) * step               // 8000 → 8000

    // Primer corte: el tope del rango "Hasta"
    const first = start + step

    // Todo el catálogo cabe en un solo escalón: un único rango "Hasta"
    if (first >= end) {
        return [{ id: `0-${first}`, min: 0, max: first, label: `Hasta ${currencyFormat.format(first)}` }]
    }

    const tiers = [
        { id: `0-${first}`, min: 0, max: first, label: `Hasta ${currencyFormat.format(first)}` },
    ]

    // Rangos intermedios de $500 en $500 hasta el último corte
    const last = end - step
    for (let low = first; low < last; low += step) {
        const high = low + step
        tiers.push({
            id: `${low}-${high}`,
            min: low,
            max: high,
            label: `${currencyFormat.format(low)} – ${currencyFormat.format(high)}`,
        })
    }

    tiers.push({ id: `${last}+`, min: last, max: null, label: `Más de ${currencyFormat.format(last)}` })

    return tiers
}

// Fisher-Yates — baraja una copia sin mutar el original
function shuffle(array) {
    const copy = [...array]
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
}

/* ============================================================
   Matcheo de filtros
   ============================================================ */

// Cómo se evalúa cada filtro contra una propiedad
const filterCriteria = {
    // Igualdad exacta de tipo ("house", "condo", ...)
    propertyType: (product, chosen) => product.propertyType === chosen,

    // La provincia de la dirección debe coincidir con la elegida
    province: (product, chosen) => getFilterProvince(product) === chosen,

    // La ciudad (cantón) de la dirección debe coincidir con la elegida
    city: (product, chosen) => getCity(product) === chosen,

    // El precio cae dentro del rango elegido ("$5,000 – $7,000", etc.)
    priceTier: (product, chosen, priceTiers) => {
        const tier = priceTiers.find((option) => option.id === chosen)
        if (!tier) return false
        const price = product.price?.amount ?? 0
        return price >= tier.min && (tier.max === null || price <= tier.max)
    },
}

// Valores del estado que significan "sin preferencia" para cada filtro
const INACTIVE_FILTER_VALUES = {
    propertyType: "all",
    province: "all",
    city: "all",
    priceTier: "all",
}

// Devuelve las funciones de evaluación SOLO de los filtros que el usuario
// activó (los que difieren de su valor "sin preferencia").
//
//   Filtro estricto (grilla normal): matchers.every(test)
//   Match relajado  (sugerencias):  matchers.some(test)
function buildActiveMatchers(filters, priceTiers) {
    return Object.entries(INACTIVE_FILTER_VALUES)
        .filter(([key, inactiveValue]) => filters[key] !== inactiveValue)
        .map(([key]) => (product) => filterCriteria[key](product, filters[key], priceTiers))
}

/* ============================================================
   Hooks internos
   ============================================================ */

// Opciones dinámicas de los selects del filtro.
// Todas derivan del catálogo, de modo que los selects se pueblan solos
// al agregar propiedades al JSON.
// Las opciones de ciudad son DEPENDIENTES de la provincia elegida
// (select en cascada): solo aparecen cantones de esa provincia.
// Los useMemo no se recalculan en cada render, solo al cambiar el
// catálogo o la provincia.
function useFilterOptions(products, filters) {
    const propertyTypes = useMemo(
        () => [...new Set(products.map((product) => product.propertyType).filter(Boolean))],
        [products]
    )

    const provinces = FILTER_PROVINCES

    const cities = useMemo(
        () => [...new Set(products
            .filter((product) => filters.province === "all" || getFilterProvince(product) === filters.province)
            .map(getCity)
            .filter(Boolean))]
            .sort(),
        [products, filters.province]
    )

    const minPrice = useMemo(
        () => Math.min(...products
            .map((product) => product.price?.amount ?? 0)
            .filter((amount) => Number.isFinite(amount) && amount > 0)),
        [products]
    )

    const maxPrice = useMemo(
        () => Math.max(0, ...products.map((product) => product.price?.amount ?? 0)),
        [products]
    )

    const priceTiers = useMemo(() => buildPriceTiers(minPrice, maxPrice), [minPrice, maxPrice])

    return { propertyTypes, provinces, cities, priceTiers }
}

// Sugerencias para el estado vacío de la grilla, en 3 niveles:
//   1. Si el filtro estricto encontró resultados → no hay sugerencias
//   2. Match relajado: propiedades que cumplen AL MENOS UN filtro activo,
//      ordenadas por relevancia (las que cumplen más criterios van primero)
//   3. Si ningún filtro coincide con nada → propiedades aleatorias
//
// Memoizado: no se recalcula en cada render, solo cuando cambian los
// filtros o el catálogo (evita que las sugerencias "parpadeen").
function useSimilarProducts({ products, filters, priceTiers }) {
    return useMemo(() => {
        const matchers = buildActiveMatchers(filters, priceTiers)
        if (matchers.length === 0) return [] // sin filtros activos no hay sugerencias

        const strict = products.filter((product) => matchers.every((test) => test(product)))
        if (strict.length > 0) return [] // el estricto funciona: grilla normal

        // Nivel 2 — match relajado con conteo de coincidencias por propiedad
        const relaxed = products
            .map((product) => ({
                product,
                matches: matchers.filter((test) => test(product)).length,
            }))
            .filter((entry) => entry.matches > 0)
            .sort((a, b) => b.matches - a.matches)
            .map((entry) => entry.product)

        if (relaxed.length > 0) return relaxed

        // Nivel 3 — nada coincide: sugerencias aleatorias
        return shuffle(products).slice(0, SIMILAR_FALLBACK_COUNT)
    }, [products, filters, priceTiers])
}

/* ============================================================
   Hook público
   ============================================================ */

// useFilters — corazón del sistema de filtrado. Lo consumen el <Filter />
// (página de propiedades), PropertiesGrid (sugerencias) y FilterSearch
// (home). Todos comparten el mismo estado vía FiltersContext.
export function useFilters() {

    const { filters, setFilters, products } = useContext(FiltersContext)

    const options = useFilterOptions(products, filters)
    const similarProducts = useSimilarProducts({ products, filters, priceTiers: options.priceTiers })

    // Función (no memo) porque los consumidores la invocan en cada render:
    // devuelve las propiedades que cumplen TODOS los filtros activos.
    const filterProducts = () => {
        const matchers = buildActiveMatchers(filters, options.priceTiers)
        return products.filter((product) => matchers.every((test) => test(product)))
    }

    return {
        // Estado compartido
        filters,
        setFilters,

        // Catálogo completo (para páginas que filtran por sí mismas,
        // como CitiesIndexPage / CityPropertiesPage)
        products,

        // Filtrado
        filterProducts,
        similarProducts,

        // Opciones para poblar los selects
        ...options,
    }
}
