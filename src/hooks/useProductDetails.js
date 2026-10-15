
import { useState, useEffect } from "react";
import { useFetchProducts } from "./useFetchProducts.";
import { useParams } from "react-router-dom";




const useProductDetails = () => {
    const { products } = useFetchProducts();
    const [product, setProduct] = useState();
    const [errorMessage, setErrorMessage] = useState("Cargando...")
    const [notFound, setNotFound] = useState(true)

    const { productId } = useParams()

    useEffect(() => {

        if (products.length === 0) { //PENDIENTE //  MANEJAR LOS MENSAJES ATRAVEZ DE UN ESTADO
            return
        }

        const productDetails = products.find(item => item.id === Number(productId));

        if (!productDetails) {
            setNotFound(false)
            setErrorMessage("Producto no encontrado")
            return
        }

        setProduct(productDetails);
    }, [products, productId]);



    return { product, products, errorMessage, notFound, productId }


}
export default useProductDetails