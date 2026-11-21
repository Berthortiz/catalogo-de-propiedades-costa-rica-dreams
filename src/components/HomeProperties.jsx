/**
 * HomeProperties — sección de la home con la grilla de propiedades.
 * Independiente del filtro: muestra SIEMPRE el catálogo completo
 * (los filtros en vivo viven en /products y no afectan esta sección,
 * ni al regresar desde esa página).
 */
import { useContext } from 'react'
import { FiltersContext } from '../contexts/FiltersContext'
import PropertiesGrid from './PropertiesGrid'

export default function HomeProperties() {

  const { products } = useContext(FiltersContext)

  return (
    <section className="properties-page Wrapper relative">
      <header className="properties-heading">
        <div>
          <span className="properties-eyebrow">COSTA RICA</span>
          <h1>Propiedades destacadas</h1>
        </div>
        <span className="properties-count">{products.length} propiedades</span>
      </header>

      <PropertiesGrid products={products} />
    </section>
  )
}
