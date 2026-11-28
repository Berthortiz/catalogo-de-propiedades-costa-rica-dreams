import "./Filter.css"

import { useId } from "react"
import { useFilters } from "../hooks/useFilter"
import { DEFAULT_FILTERS } from "../contexts/FiltersContext"

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

export default function Filter({ resetTo = DEFAULT_FILTERS }) {

  const {
    filters,
    setFilters,
    propertyTypes,
    provinces,
    cities,
    priceTiers,
  } = useFilters()

  const typeFilterId = useId()
  const provinceFilterId = useId()
  const cityFilterId = useId()
  const priceFilterId = useId()

  const onChange = (key) => (event) =>
    setFilters((previous) => ({ ...previous, [key]: event.target.value }))

  // Select en cascada: cambiar la provincia resetea la ciudad y el precio
  // (el precio depende de la ciudad), para no dejar valores huérfanos
  const onChangeProvince = (event) =>
    setFilters((previous) => ({
      ...previous,
      province: event.target.value,
      city: "all",
      priceTier: "all",
    }))

  // Cambiar la ciudad también resetea el precio: los rangos dependen de la
  // ciudad y el rango anterior puede no existir en la nueva lista
  const onChangeCity = (event) =>
    setFilters((previous) => ({
      ...previous,
      city: event.target.value,
      priceTier: "all",
    }))

  // La ciudad solo se habilita después de elegir provincia
  const cityDisabled = filters.province === "all"

  // El precio solo se habilita después de elegir ciudad
  const priceDisabled = filters.city === "all"

  return (
    <div className="property-filter-container">
      <div className="filter-topbar">
        <button
          type="button"
          className="filter-reset"
          onClick={() => setFilters(resetTo)}
          disabled={!isDirty(filters, resetTo)}
        >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
          Limpiar filtros
        </button>
      </div>

      <div className="filter-box">
        <div className="filter-grid">

          {/* Campo: Tipo de propiedad */}
          <div className="filter-field">
            <label htmlFor={typeFilterId}>Tipo de propiedad</label>
            <div className="select-wrapper">
              <select id={typeFilterId} value={filters.propertyType} onChange={onChange("propertyType")}>
                <option value="all">Todas</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>{typeLabel(type)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Campo: Provincia */}
          <div className="filter-field">
            <label htmlFor={provinceFilterId}>Provincia</label>
            <div className="select-wrapper">
              <select id={provinceFilterId} value={filters.province} onChange={onChangeProvince}>
                <option value="all">Todas</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Campo: Ciudad — dependiente de la provincia (cascada) */}
          <div className="filter-field" data-tooltip={cityDisabled ? CITY_TOOLTIP_TEXT : undefined}>
            <label htmlFor={cityFilterId}>Ciudad</label>
            <div className="select-wrapper">
              <select
                id={cityFilterId}
                value={filters.city}
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
          <div className="filter-field" data-tooltip={priceDisabled ? PRICE_TOOLTIP_TEXT : undefined}>
            <label htmlFor={priceFilterId}>Precio máximo</label>
            <div className="select-wrapper">
              <select
                id={priceFilterId}
                value={filters.priceTier}
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

        </div>
      </div>
    </div>
  )
}

// Hay filtros activos si algún valor difiere del estado de limpieza.
// En la página por ciudad el "estado de limpieza" conserva provincia y
// ciudad (resetTo), de modo que limpiar no muestra el catálogo completo.
function isDirty(filters, resetTo = DEFAULT_FILTERS) {
  return Object.keys(resetTo)
    .some((key) => filters[key] !== resetTo[key])
}
