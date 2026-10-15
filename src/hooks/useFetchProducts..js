import { useEffect, useState } from "react"
import { fetchProduct } from "../api/fetchProducto";


// UNA SOLA FUENTE
export const useFetchProducts = () => {
    const [products, setProducts] = useState([])
    // console.log(products);
    const getProducts = async () => {
        try {

            const newProducts = await fetchProduct()
            setProducts(newProducts)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        getProducts()
    }, [])

    return { products, setProducts, getProducts }



}