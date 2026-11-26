import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useFetchProducts } from "../hooks/useFetchProducts.";
import useProductDetails from "../hooks/useProductDetails";
import GalleryProduct from "../components/ProductDetailsPage/GalleryProducts";
import ProductDetail from "../components/ProductDetailsPage/ProductDetail";

export default function ProductDetailPage() {

    const { productId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { product, errorMessage } = useProductDetails({ productId })

    if (!product) {
        return <h1>{errorMessage}</h1>
    }
    return (
        <main className="productoDetailPage__container pt-4 pb-14 px-3 lg:px-10">
            {state?.fromCityPage === true && (
                <button
                    type="button"
                    className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                    onClick={() => navigate(-1)}
                >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                        <path d="M20 12H9" />
                    </svg>
                    Regresar
                </button>
            )}
            {
                product ? (
                    <>
                        <section className="property-detail-layout mx-auto w-full max-w-7xl">
                            <div className="property-detail-gallery-column">
                                <GalleryProduct />
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
                            </div>
                            <ProductDetail />
                        </section>
                    </>
                ) : <h3>{errorMessage} </h3>
            }
        </main>
    )
}