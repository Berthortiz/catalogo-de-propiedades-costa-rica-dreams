/**
 * CitiesIndexPage — índice de ciudades: /ciudades.
 *
 * Lista todas las ciudades presentes en el catálogo con su cantidad de
 * propiedades y enlaza a su página (/ciudades/:ciudad). Se genera sola
 * del JSON: al agregar propiedades de una ciudad nueva, su tarjeta
 * aparece automáticamente.
 */
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useFilters } from "../hooks/useFilter"
import { getCitiesFromProducts } from "../utils/citySlug"
import "./CitiesIndex.css"

export default function CitiesIndexPage() {

    const { products } = useFilters()

    const cities = useMemo(
        () => getCitiesFromProducts(products),
        [products]
    )

    const isLoaded = products.length > 0

    return (
        <main className="properties-page Wrapper min-h-96 relative">
            <header className="properties-heading">
                <div>
                    <span className="properties-eyebrow">COSTA RICA</span>
                    <h1>Ciudades</h1>
                </div>
                <span className="properties-count">
                    {cities.length} {cities.length === 1 ? "ciudad" : "ciudades"}
                </span>
            </header>

            {!isLoaded ? (
                <p className="cities-index__loading">Cargando ciudades…</p>
            ) : (
                <ul className="cities-index">
                    {cities.map(({ city, province, slug, count }) => (
                        <li key={slug} className="cities-index__card">
                            <Link
                                to={`/ciudades/${slug}`}
                                className="cities-index__link"
                            >
                                <span className="cities-index__province">{province || "Costa Rica"}</span>
                                <h2 className="cities-index__name">{city}</h2>
                                <span className="cities-index__count">
                                    {count} {count === 1 ? "propiedad" : "propiedades"}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}
