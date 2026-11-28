/**
 * CityPropertiesPage — página de propiedades por ciudad.
 * Ruta: /ciudades/:ciudad (ej. /ciudades/escazu, /ciudades/santa-ana).
 *
 * No existe un archivo por ciudad: la página resuelve el slug de la URL
 * contra las ciudades presentes en el JSON (address → cantón). Al agregar
 * propiedades de una ciudad nueva, /ciudades/<slug> funciona sola.
 *
 * El slug amigable es ideal para compartirse directo (WhatsApp, email):
 * el cliente manda /ciudades/escazu y el visitante ve solo las
 * propiedades de esa ciudad.
 *
 * Pre-selecciona la ciudad en el contexto de filtros y la limpia
 * al salir, para no contaminar /products ni la home. Esta página no muestra
 * controles de filtrado adicionales.
 */
import { useEffect, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import PropertiesGrid from "../components/PropertiesGrid"
import { useFilters } from "../hooks/useFilter"
import { DEFAULT_FILTERS } from "../contexts/FiltersContext"
import { findCityBySlug } from "../utils/citySlug"

export default function CityPropertiesPage() {

    const { ciudad } = useParams()
    const { products, filters, setFilters, filterProducts } = useFilters()

    // El catálogo se carga de forma asíncrona: products.length > 0 evita
    // confundir "cargando" con "esta ciudad no tiene propiedades"
    const isLoaded = products.length > 0

    const cityEntry = useMemo(
        () => (isLoaded ? findCityBySlug(products, ciudad) : null),
        [isLoaded, products, ciudad]
    )

    // Filtros de "limpieza" que respetan la ciudad de la página: el botón
    // "Limpiar filtros" no debe borrar la ciudad ni mostrar todo el catálogo
    // bajo un título de otra ciudad.
    // Solo se filtra por ciudad: la provincia del filtro no siempre coincide
    // con la de la dirección (ej. Heredia se agrupa como "San José" en
    // useFilter) y algunas direcciones no la incluyen. Filtrar también por
    // provincia dejaba páginas como /ciudades/heredia sin resultados.
    const cityFilters = useMemo(
        () => cityEntry
            ? { ...DEFAULT_FILTERS, city: cityEntry.city }
            : DEFAULT_FILTERS,
        [cityEntry]
    )

    // Siembra la ciudad al entrar y la limpia al salir
    useEffect(() => {
        if (!cityEntry) return undefined

        setFilters(cityFilters)

        return () => setFilters(DEFAULT_FILTERS)
    }, [cityEntry, cityFilters, setFilters])

    const filtedProducts = filterProducts()

    // Estado de carga
    if (!isLoaded) {
        return (
            <main className="properties-page Wrapper min-h-96">
                <header className="properties-heading">
                    <div>
                        <span className="properties-eyebrow">COSTA RICA</span>
                        <h1>Cargando…</h1>
                    </div>
                </header>
            </main>
        )
    }

    // La URL no corresponde a ninguna ciudad del catálogo
    if (!cityEntry) {
        return (
            <main className="properties-page Wrapper min-h-96">
                <header className="properties-heading">
                    <div>
                        <span className="properties-eyebrow">COSTA RICA</span>
                        <h1>Ciudad no encontrada</h1>
                    </div>
                </header>
                <p>
                    Todavía no hay propiedades publicadas en esta ciudad.{" "}
                    <Link to="/products">Ver todo el catálogo</Link> o{" "}
                    <Link to="/ciudades">explora las ciudades disponibles</Link>.
                </p>
            </main>
        )
    }

    // Evita el destello del catálogo completo en el frame anterior al efecto
    const isSynced =
        filters.province === cityFilters.province &&
        filters.city === cityFilters.city

    if (!isSynced) return null

    return (
        <main className="properties-page Wrapper min-h-96 relative">
            <header className="properties-heading">
                <div>
                    <span className="properties-eyebrow">
                        {cityEntry.province || "COSTA RICA"}
                    </span>
                    <h1>Propiedades en {cityEntry.city}</h1>
                </div>
                <span className="properties-count">
                    {filtedProducts.length} {filtedProducts.length === 1 ? "propiedad" : "propiedades"}
                </span>
            </header>

            <PropertiesGrid products={filtedProducts} resetTo={cityFilters} cityName={cityEntry.city} />
        </main>
    )
}
