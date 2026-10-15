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
        <main className="productoDetailPage__container py-14 px-10">
            {
                product ? (
                    <>
                        <section className="property-detail-layout max-w-7xl  flex gap-8">
                            <GalleryProduct />
                            <ProductDetail />
                        </section>
                        {product.description && <section className="property-description">
                            <header className="property-description__intro">
                                <span className="properties-eyebrow">DETALLES DEL INMUEBLE</span>
                                <h2>Descripción de la propiedad</h2>
                                {product.description.summary && <p>{product.description.summary}</p>}
                            </header>
                            {product.description.sections?.map((section, sectionIndex) => (
                                <section className="property-description__section" key={`${section.title}-${sectionIndex}`}>
                                    <h3>{section.title}</h3>
                                    {section.paragraphs?.map((paragraph, paragraphIndex) => (
                                        <p key={`${section.title}-${paragraphIndex}`}>{paragraph}</p>
                                    ))}
                                </section>
                            ))}
                        </section>}
                    </>
                ) : <h3>{errorMessage} </h3>
            }
        </main>
    )
}