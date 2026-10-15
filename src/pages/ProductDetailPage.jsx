import { useParams } from "react-router-dom";
// import { useFetchProducts } from "../hooks/useFetchProducts.";
import useProductDetails from "../hooks/useProductDetails";
import GalleryProduct from "../components/ProductDetailsPage/GalleryProducts";
import ProductDetail from "../components/ProductDetailsPage/ProductDetail";

export default function ProductDetailPage() {

    const { productId } = useParams();
    const { product, errorMessage } = useProductDetails({ productId })

    if (!product) {
        return <h1>{errorMessage}</h1>
    }
    return (
        <main className="productoDetailPage__container py-14">
            {
                product ? (
                    <section className=" flex gap-8" >
                        <GalleryProduct />
                        <ProductDetail />
                    </section>
                ) : <h3>{errorMessage} </h3>
            }
        </main>
    )
}