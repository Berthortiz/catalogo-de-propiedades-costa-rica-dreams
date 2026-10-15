import { createContext, useState } from "react"
import { useFetchProducts } from "../hooks/useFetchProducts."



export const FiltersContext = createContext()


console.log('Sin errore hasta aqui filter context');

// eslint-disable-next-line react/prop-types
export function FilterProvider({ children }) {

    const { products } = useFetchProducts()


    const [filters, setFilters] = useState({
        category: 'all',
        availability: 'all',
        price: 0
    })



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
