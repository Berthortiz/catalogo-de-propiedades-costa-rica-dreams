/**
 * PropertiesGrid — grilla de tarjetas de propiedades + estado vacío.
 * Extraída de Products.jsx para reutilizarse en la home (HomeProperties)
 * y en la página de propiedades. Recibe la lista ya filtrada por props.
 * Si no hay coincidencias, muestra sugerencias (similarProducts del hook):
 * primero propiedades que cumplen al menos un filtro activo y, si ninguna
 * coincide, algunas aleatorias.
 */
import { Link, useLocation } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { useFilters } from '../hooks/useFilter';
import { DEFAULT_FILTERS } from '../contexts/FiltersContext';
import WhatsAppButton from './WhatsAppButton';
import PropertyFacts from './PropertyFacts';
import './Products.css';

function PropertyCard({ product, fromCityPage, cityName }) {
  const propertyLinkState = { fromCityPage, cityName };

  return (
    <li className="property-card">
      {product.agent && <header className="property-agent">
        <div className="agent-info">
          {product.agent.avatar && <img src={product.agent.avatar} alt="" className="agent-avatar" loading="lazy" />}
          <span>{product.agent.name}</span>
        </div>
        <span className="agent-time">{product.agent.timeAgo}</span>
      </header>}
      <Link to={`/products/${product.id}`} state={propertyLinkState} className="property-media">
        {product.images?.[0]
          ? <img src={product.images[0]} alt={product.title} loading="lazy" />
          : <span className="property-media__placeholder">Fotografías próximamente</span>}
        {product.available != null && <span className={`property-status ${product.available ? 'property-status--available' : 'property-status--unavailable'}`}>
          {product.available ? 'Disponible' : 'No disponible'}
        </span>}
        <span className="property-price">{formatPrice(product.price)}</span>
      </Link>
      <div className="property-body">
        <h2><Link to={`/products/${product.id}`} state={propertyLinkState}>{product.title}</Link></h2>
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
}

export default function PropertiesGrid({ products, resetTo = DEFAULT_FILTERS, cityName }) {

  const { setFilters, similarProducts } = useFilters()
  const { pathname } = useLocation()
  const fromCityPage = /^\/ciudades\/[^/]+\/?$/.test(pathname)

  return (
    <>
      <ul id="resultados" className="properties-grid">
        {products.map((product) => (
          <PropertyCard key={product.id} product={product} fromCityPage={fromCityPage} cityName={cityName} />
        ))}
      </ul>

      {products.length === 0 && (
        <div className="properties-empty">
          <p>No se encontró ninguna propiedad con estas características</p>
          <button
            type="button"
            className="filter-reset properties-empty__reset"
            onClick={() => setFilters(resetTo)}
          >
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            Limpiar filtros
          </button>

          {similarProducts.length > 0 && (
            <div className="properties-similar">
              <p className="properties-similar__title">Pero te puede interesar esta otras</p>
              <ul className="properties-grid">
                {similarProducts.map((product) => (
                  <PropertyCard key={product.id} product={product} fromCityPage={fromCityPage} cityName={cityName} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  )
}
