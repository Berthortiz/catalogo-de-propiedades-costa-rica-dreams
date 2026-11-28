/**
 * FilterSearch — filtro de búsqueda para la Home, independiente del filtro
 * de /products. Mantiene su propio estado local; la consulta solo se ejecuta
 * al pulsar "Buscar propiedades", que siembra el contexto de filtros y
 * navega a /products (donde la grilla ya aparece filtrada).
 */
import { useState, useId, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { buildFilterOptions, useFilters } from "../../hooks/useFilter"
import { DEFAULT_FILTERS } from "../../contexts/FiltersContext"
import "./FilterSearch.css"

const TYPE_LABELS = {
    house: "Casa",
    apartment: "Apartamento",
    condo: "Condominio",
    villa: "Villa",
    studio: "Estudio",
    lot: "Lote",
}

const typeLabel = (type) =>
    TYPE_LABELS[type]
    ?? type.replaceAll("-", " ").replace(/^\w/, (c) => c.toUpperCase())

// Mensaje del tooltip (CSS puro) que explica por qué Ciudad está deshabilitada
const CITY_TOOLTIP_TEXT = "Elija primero la provincia"

// Mensaje del tooltip (CSS puro) que explica por qué Precio está deshabilitado
const PRICE_TOOLTIP_TEXT = "Elija primero la ciudad"

export default function FilterSearch() {
    const navigate = useNavigate()
    const { products, setFilters } = useFilters()

    // Borrador local: no toca el contexto hasta que se confirma la búsqueda
    const [draft, setDraft] = useState(DEFAULT_FILTERS)

    // Opciones derivadas del borrador (no del contexto): ciudad y precios
    // responden a lo que el usuario elige aquí, antes de pulsar "Buscar".
    const { province, city } = draft
    const { propertyTypes, provinces, cities, priceTiers } = useMemo(
        () => buildFilterOptions(products, { province, city }),
        [products, province, city]
    )

    const typeFilterId = useId()
    const provinceFilterId = useId()
    const cityFilterId = useId()
    const priceFilterId = useId()

    const onChange = (key) => (event) =>
        setDraft((previous) => ({ ...previous, [key]: event.target.value }))

    // Select en cascada: cambiar la provincia resetea la ciudad y el precio
    // (el precio depende de la ciudad), para no dejar valores huérfanos
    const onChangeProvince = (event) =>
        setDraft((previous) => ({
            ...previous,
            province: event.target.value,
            city: "all",
            priceTier: "all",
        }))

    // Cambiar la ciudad también resetea el precio: los rangos dependen de la
    // ciudad y el rango anterior puede no existir en la nueva lista
    const onChangeCity = (event) =>
        setDraft((previous) => ({
            ...previous,
            city: event.target.value,
            priceTier: "all",
        }))

    // La ciudad solo se habilita después de elegir provincia
    const cityDisabled = draft.province === "all"

    // El precio solo se habilita después de elegir ciudad
    const priceDisabled = draft.city === "all"

    const handleSearch = () => {
        setFilters(draft)
        // El hash hace que ScrollToTop desplace la vista hasta la grilla de resultados
        navigate("/products#resultados")
    }

    return (
        <section className="filter-search-container">
            <div className="filter-search-box">
                <div className="filter-search-grid">

                    {/* Campo: Tipo de propiedad */}
                    <div className="filter-search-field">
                        <label htmlFor={typeFilterId}>Tipo de propiedad</label>
                        <div className="filter-search-select-wrapper">
                            <select id={typeFilterId} value={draft.propertyType} onChange={onChange("propertyType")}>
                                <option value="all">Todas</option>
                                {propertyTypes.map((type) => (
                                    <option key={type} value={type}>{typeLabel(type)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Campo: Provincia */}
                    <div className="filter-search-field">
                        <label htmlFor={provinceFilterId}>Provincia</label>
                        <div className="filter-search-select-wrapper">
                            <select id={provinceFilterId} value={draft.province} onChange={onChangeProvince}>
                                <option value="all">Todas</option>
                                {provinces.map((province) => (
                                    <option key={province} value={province}>{province}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Campo: Ciudad — dependiente de la provincia (cascada) */}
                    <div className="filter-search-field" data-tooltip={cityDisabled ? CITY_TOOLTIP_TEXT : undefined}>
                        <label htmlFor={cityFilterId}>Ciudad</label>
                        <div className="filter-search-select-wrapper">
                            <select
                                id={cityFilterId}
                                value={draft.city}
                                onChange={onChangeCity}
                                disabled={cityDisabled}
                            >
                                <option value="all">{cityDisabled ? "Elija provincia" : "Todas"}</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Campo: Precio máximo — dependiente de la ciudad (cascada) */}
                    <div className="filter-search-field" data-tooltip={priceDisabled ? PRICE_TOOLTIP_TEXT : undefined}>
                        <label htmlFor={priceFilterId}>Precio máximo</label>
                        <div className="filter-search-select-wrapper">
                            <select
                                id={priceFilterId}
                                value={draft.priceTier}
                                onChange={onChange("priceTier")}
                                disabled={priceDisabled}
                            >
                                <option value="all">{priceDisabled ? "Elija ciudad" : "Cualquiera"}</option>
                                {priceTiers.map((tier) => (
                                    <option key={tier.id} value={tier.id}>{tier.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Acciones: botón junto a los inputs (5ª columna) */}
                    <div className="filter-search-actions">
                        <button type="button" className="filter-search-button" onClick={handleSearch}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            Buscar
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
