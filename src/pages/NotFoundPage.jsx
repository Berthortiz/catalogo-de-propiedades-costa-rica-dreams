import { Link } from "react-router-dom";
import FilterSearch from "../components/FilterSearch/FilterSearch";
import HomeProperties from "../components/HomeProperties";
import "./NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <main className="not-found-page">
            <section className="not-found-hero">
                <div className="not-found-hero__content">
                    <span className="not-found-hero__eyebrow">Costa Rica Dreams</span>
                    <p className="not-found-hero__code" aria-hidden="true">404</p>
                    <h1>Esta propiedad parece haberse mudado</h1>
                    <p className="not-found-hero__text">
                        La página que buscas no existe o fue trasladada. Encuentra
                        tu próximo espacio en Costa Rica con nuestro buscador.
                    </p>
                    <div className="not-found-hero__actions">
                        <Link className="not-found-button not-found-button--primary" to="/">
                            Volver al inicio
                        </Link>
                        <Link className="not-found-button not-found-button--secondary" to="/products">
                            Ver propiedades
                        </Link>
                    </div>
                </div>
            </section>

            <div className="not-found-filter">
                <FilterSearch />
            </div>

            <HomeProperties />
        </main>
    );
}
