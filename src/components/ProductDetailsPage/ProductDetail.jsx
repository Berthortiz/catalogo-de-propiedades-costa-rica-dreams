import useProductDetails from "../../hooks/useProductDetails";
import "./ProductDetail.css"
import { formatPrice } from "../../utils/formatPrice";
import WhatsAppButton from "../WhatsAppButton";




export default function ProductDetail() {
    const { product, errorMessage } = useProductDetails()


    if (!product) {
        return <h1>{errorMessage}</h1>
    }


    return (
        <div className="ProductDetail">
            <span className="ProductDetail__category" > {product.propertyType.replaceAll('-', ' ')} · {product.available ? 'Disponible' : 'No disponible'} </span>
            <h1 className="ProductDetail__title">{product.title}</h1>
            <p className="ProductDetail__description" >{product.address}</p>
            <div className="ProductDetail__price-container">
                <div>
                    <p className="ProductDetail__price">{formatPrice(product.price)}</p>
                </div>
            </div>
            <ul className="detail-specs">
                <li><strong>{product.specifications.bedrooms}</strong> habitaciones</li>
                <li><strong>{product.specifications.bathrooms}</strong> baños</li>
                <li><strong>{product.specifications.garage}</strong> garaje</li>
                <li><strong>{product.specifications.sqFt.toLocaleString()}</strong> sq ft</li>
            </ul>
            {product.pricePerSqFt && <p className="price-per-sqft">{formatPrice({ amount: product.pricePerSqFt, currency: product.price.currency })} por sq ft</p>}
            <section className="agent-detail">
                {product.agent.avatar && <img src={product.agent.avatar} alt="" />}
                <div><strong>{product.agent.name}</strong><span>Publicado {product.agent.timeAgo}</span></div>
            </section>
            <WhatsAppButton property={product} className="detail-whatsapp-button" />

        </div>
    )
}