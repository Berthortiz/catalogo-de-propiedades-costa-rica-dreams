
// import { useFilters } from '../hooks/useFilter';
// import Filter from './Filter';
import { useFilters } from '../hooks/useFilter';
import { FiltersContext } from '../contexts/FiltersContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import WhatsAppButton from './WhatsAppButton';
import PropertyFacts from './PropertyFacts';
import './Products.css';


export default function Products() {

  const { products } = useContext(FiltersContext)

  const { filterProducts } = useFilters()
  const filtedProducts = filterProducts(products)


  return (

    <main className="properties-page Wrapper min-h-96 relative">
      <header className="properties-heading">
        <div>
          <span className="properties-eyebrow">COSTA RICA · MIAMI</span>
          <h1>Propiedades</h1>
        </div>
        <span className="properties-count">{filtedProducts.length} propiedades</span>
      </header>
      {/* <Filter /> */}

      <ul className="properties-grid">
        {
          filtedProducts.map((product) => {
            return (
              <li key={product.id} className="property-card">
                {product.agent && <header className="property-agent">
                  <div className="agent-info">
                    {product.agent.avatar && <img src={product.agent.avatar} alt="" className="agent-avatar" loading="lazy" />}
                    <span>{product.agent.name}</span>
                  </div>
                  <span className="agent-time">{product.agent.timeAgo}</span>
                </header>}
                <Link to={`/products/${product.id}`} className="property-media">
                  {product.images?.[0]
                    ? <img src={product.images[0]} alt={product.title} loading="lazy" />
                    : <span className="property-media__placeholder">Fotografías próximamente</span>}
                  {product.available != null && <span className={`property-status ${product.available ? 'property-status--available' : 'property-status--unavailable'}`}>
                    {product.available ? 'Disponible' : 'No disponible'}
                  </span>}
                  <span className="property-price">{formatPrice(product.price)}</span>
                </Link>
                <div className="property-body">
                  <h2><Link to={`/products/${product.id}`}>{product.title}</Link></h2>
                  <p className="property-address">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    {product.address}
                  </p>
                  <PropertyFacts property={product} compact />
                </div>
                <footer className="property-footer">
                  <span>{product.propertyType === 'house' ? 'Casa' : product.propertyType.replaceAll('-', ' ')}</span>
                  {product.pricePerSqFt && <span>{formatPrice({ amount: product.pricePerSqFt, currency: product.price.currency })} / sq ft</span>}
                </footer>

                <WhatsAppButton property={product} className="property-whatsapp-button" />

              </li>

            )

          })
        }

      </ul>
    </main>

  )


}