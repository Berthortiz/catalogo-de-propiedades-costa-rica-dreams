import { useContext } from "react"
import { FiltersContext } from "../contexts/FiltersContext"



export function useFilters() {


    const { filters, setFilters, products } = useContext(FiltersContext)

    const filterProducts = () => {
        return products.filter(product => {
            const matchesAvailability = filters.availability === "all"
                || (filters.availability === "unknown"
                    ? product.available === null || product.available === undefined
                    : product.available === (filters.availability === "available"))

            return (
                product.price.amount >= filters.price &&
                (filters.category === "all" || product.propertyType === filters.category) &&
                matchesAvailability
            )
        }

        )


    }

    return { filters, filterProducts, setFilters }


}