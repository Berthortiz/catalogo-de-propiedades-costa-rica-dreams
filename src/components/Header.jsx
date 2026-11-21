import { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-cd-m.png";
import { useFilters } from "../hooks/useFilter";
import { getCitiesFromProducts } from "../utils/citySlug";
import "./Header.css";

const contactUrl = "https://wa.me/50663964070";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Enlaces de ciudades generados del catálogo: al agregar propiedades
    // de una ciudad nueva al JSON, su enlace aparece solo
    const { products } = useFilters();
    const cities = useMemo(() => getCitiesFromProducts(products), [products]);

    const links = useMemo(() => [
        { href: "/products", label: "Inicio" },
        { href: "/products", label: "Propiedades" },
        {
            href: "/ciudades",
            label: "Ciudades",
            // Submenú: rutas de ciudades generadas del catálogo (aparecen solas)
            submenu: cities.map(({ slug, city }) => ({ href: `/ciudades/${slug}`, label: city })),
        },
        // { href: "https://www.paypal.com/ncp/payment/R2QJS8AAF58S2", label: "PayPal", external: true },
    ], [cities]);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        const closeOnEscape = (event) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        const closeOnResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", closeOnEscape);
        window.addEventListener("resize", closeOnResize);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", closeOnEscape);
            window.removeEventListener("resize", closeOnResize);
        };
    }, [menuOpen]);

    const renderLinks = (mobile = false) => links.map(({ href, label, external, submenu }) => {
        const baseClass = mobile ? "mobile-menu-link" : "desktop-menu-link";
        // El padre del submenú lleva caret indicador (solo desktop)
        const className = submenu?.length && !mobile ? `${baseClass} desktop-menu-link--has-sub` : baseClass;
        const closeMenu = mobile ? () => setMenuOpen(false) : undefined;

        const link = external ? (
            <a className={className} href={href} target="_blank" rel="noreferrer" onClick={closeMenu}>
                {label}
            </a>
        ) : (
            <Link className={className} to={href} onClick={closeMenu}>
                {label}
            </Link>
        );

        // Enlace simple, sin submenú
        if (!submenu?.length) {
            return <Fragment key={label}>{link}</Fragment>;
        }

        // Móvil: ciudades indentadas debajo del enlace padre
        if (mobile) {
            return (
                <Fragment key={label}>
                    {link}
                    {submenu.map((sub) => (
                        <Link key={sub.label} className="mobile-menu-link mobile-menu-link--sub" to={sub.href} onClick={closeMenu}>
                            {sub.label}
                        </Link>
                    ))}
                </Fragment>
            );
        }

        // Desktop: panel desplegable bajo el enlace padre
        return (
            <div key={label} className="desktop-menu-item">
                {link}
                <div className="desktop-submenu">
                    {submenu.map((sub) => (
                        <Link key={sub.label} className="desktop-menu-link" to={sub.href}>
                            {sub.label}
                        </Link>
                    ))}
                </div>
            </div>
        );
    });

    return (
        <header className="site-header pt-5 lg:w-full ">
            <div className="site-header-inner lg:w-6xl ">
                <Link className="site-brand" to="/" aria-label="Costa Rica Dreams, inicio">
                    <img className="site-brand-logo" src={logo} alt="Costa Rica Dreams Real Estate" />
                </Link>

                <div className="site-header-pill">
                    <nav className="desktop-navigation" aria-label="Navegación principal">
                        {renderLinks()}
                    </nav>

                    <button
                        className="mobile-menu-toggle"
                        type="button"
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                        aria-controls="mobile-menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? (
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
                        ) : (
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>

                <a className="header-contact desktop-contact" href={contactUrl} target="_blank" rel="noreferrer">
                    Contacto
                </a>
            </div>

            {menuOpen && <button className="mobile-menu-backdrop" type="button" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)} />}

            <nav id="mobile-menu" className={`mobile-navigation${menuOpen ? " is-open" : ""}`} aria-label="Menú móvil" aria-hidden={!menuOpen}>
                <div className="mobile-menu-heading">
                    <img className="site-brand-logo site-brand-logo--menu" src={logo} alt="Costa Rica Dreams Real Estate" />
                    <button className="mobile-menu-close" type="button" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
                    </button>
                </div>
                <div className="mobile-menu-links">{renderLinks(true)}</div>
                <a className="header-contact mobile-contact" href={contactUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                    Contacto por WhatsApp
                </a>
                {/* <div className="header-social-links">
                    <span>Redes sociales</span>
                    <a href="https://youtube.com/@berthortiz?si=BBZQJ3pbdA6iKWga" target="_blank" rel="noreferrer">YouTube</a>
                    <a href="https://www.instagram.com/berth_ortiz/" target="_blank" rel="noreferrer">Instagram</a>
                    <a href={contactUrl} target="_blank" rel="noreferrer">WhatsApp</a>
                </div> */}
            </nav>
        </header>
    );
}

export default Header;