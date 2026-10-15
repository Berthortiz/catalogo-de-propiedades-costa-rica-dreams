import { useContext } from "react"
import { FiltersContext } from "../contexts/FiltersContext"



export function useFilters() {


    const { filters, setFilters, products } = useContext(FiltersContext)

    const filterProducts = () => {
        return products.filter(product => {
            return (
                product.price.amount >= filters.price &&
                (filters.category === "all" || product.propertyType === filters.category) &&
                (filters.availability === "all" || product.available === (filters.availability === "available"))
            )
        }

        )


    }

    return { filters, filterProducts, setFilters }


}