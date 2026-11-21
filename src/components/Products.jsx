import Filter from './Filter';
import PropertiesGrid from './PropertiesGrid';
import { useFilters } from '../hooks/useFilter';
import './Products.css';


export default function Products() {

  const { filterProducts } = useFilters()
  const filtedProducts = filterProducts()


  return (

    <main className="properties-page Wrapper min-h-96 relative">
      <header className="properties-heading">
        <div>
          <span className="properties-eyebrow">COSTA RICA</span>
          <h1>Propiedades</h1>
        </div>
        <span className="properties-count">{filtedProducts.length} propiedades</span>
      </header>
      <Filter />

      <PropertiesGrid products={filtedProducts} />
    </main>

  )


}
