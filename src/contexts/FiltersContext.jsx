import { createContext, useState } from "react"
import { useFetchProducts } from "../hooks/useFetchProducts."



export const FiltersContext = createContext()

// Estado inicial de los filtros — compartido por el provider y el botón de reset
export const DEFAULT_FILTERS = {
    propertyType: 'all',
    province: 'all',
    city: 'all',
    priceTier: 'all'
}

// eslint-disable-next-line react/prop-types
export function FilterProvider({ children }) {

    const { products } = useFetchProducts()


    const [filters, setFilters] = useState(DEFAULT_FILTERS)



    return (
        <FiltersContext.Provider
            value={{
                filters,
                setFilters,
                products,

            }}>

            {children}


        </FiltersContext.Provider>
    )
}
