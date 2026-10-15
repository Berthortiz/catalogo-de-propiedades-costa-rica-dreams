import "./Filter.css"

import { useId } from "react"
import { useContext } from "react"
import { FiltersContext } from "../contexts/FiltersContext"
import { useFilters } from "../hooks/useFilter"



export default function Filter() {

  const { filters, setFilters } = useFilters()
  const { products } = useContext(FiltersContext)


  const categoryFilterId = useId()
  const priceFilterId = useId()
  const availabilityFilterId = useId()
  const propertyTypes = [...new Set(products.map((product) => product.propertyType))]
  const maxPrice = Math.max(...products.map((product) => product.price.amount), 10000)



  const onChangePrice = (event) => {

    setFilters(prevState => ({
      ...prevState,
      price: Number(event.target.value)

    })

    )

  }




  const onChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    })

    )

  }


  return (
    <>
      <section className="property-filters">
        <div className="property-filter property-filter--category">

          <label htmlFor={categoryFilterId} className="pr-3" >Categorias</label>
          <select name="category" value={filters.category} onChange={onChangeCategory} id={categoryFilterId}>

            <option value="all">Todas</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type.replaceAll('-', ' ')}</option>
            ))}

          </select>

        </div>


        <div className="property-filter property-filter--availability">
          <label htmlFor={availabilityFilterId} className="pr-3">Disponibilidad</label>
          <select id={availabilityFilterId} name="availability" value={filters.availability} onChange={(event) => setFilters((previous) => ({ ...previous, availability: event.target.value }))}>
            <option value="all">Todas</option>
            <option value="available">Disponible</option>
            <option value="unavailable">No disponible</option>
            <option value="unknown">Por confirmar</option>
          </select>
        </div>

        <div className="property-filter property-filter--price">

          <label htmlFor={priceFilterId} className=" pr-3">Precio</label>
          <input type="range"
            name=""
            onChange={onChangePrice}
            className=""
            id={priceFilterId}
            min={0}
            max={maxPrice}
            step={Math.max(100, Math.round(maxPrice / 100))}
            value={filters.price} />

          <span className="pl-3">{filters.price}</span>
        </div>





      </section>

    </>
  )
}