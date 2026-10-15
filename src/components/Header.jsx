import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-cd-m.png";
import "./Header.css";

const links = [
    { href: "/products", label: "Inicio" },
    { href: "/products", label: "Propiedades" },
    // { href: "https://www.paypal.com/ncp/payment/R2QJS8AAF58S2", label: "PayPal", external: true },
];

const contactUrl = "https://wa.me/50662400129";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

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

    const renderLinks = (mobile = false) => links.map(({ href, label, external }) => {
        const className = mobile ? "mobile-menu-link" : "desktop-menu-link";
        const closeMenu = mobile ? () => setMenuOpen(false) : undefined;

        return external ? (
            <a key={label} className={className} href={href} target="_blank" rel="noreferrer" onClick={closeMenu}>
                {label}
            </a>
        ) : (
            <Link key={label} className={className} to={href} onClick={closeMenu}>
                {label}
            </Link>
        );
    });

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link className="site-brand" to="/home" aria-label="Costa Rica Dreams, inicio">
                    <img className="site-brand-logo" src={logo} alt="Costa Rica Dreams Real Estate" />
                </Link>

                <nav className="desktop-navigation" aria-label="Navegación principal">
                    {renderLinks()}
                </nav>

                <a className="header-contact desktop-contact" href={contactUrl} target="_blank" rel="noreferrer">
                    Contacto
                </a>

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