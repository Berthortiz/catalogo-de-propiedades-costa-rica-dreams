/**
 * GlassButton — botón estilo glassmorphism (port del componente Astro).
 * Variantes: primary (tinta sólida) / secondary (vidrio transparente) / ghost.
 * Si recibe `href` renderiza un <a> (interno usa <Link> de react-router).
 */
import { Link } from "react-router-dom";
import "./GlassButton.css";

export default function GlassButton({
    href,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    textColor,
    backgroundColor,
    fontSize,
    className = "",
    children,
    ...props
}) {
    const style = {
        ...(textColor ? { "--btn-text": textColor } : undefined),
        ...(backgroundColor ? { "--btn-bg": backgroundColor } : undefined),
        ...(fontSize ? { fontSize } : undefined),
    };

    const classes = ["glass-btn", `glass-btn--${variant}`, `glass-btn--${size}`, className]
        .filter(Boolean)
        .join(" ");

    const content = (
        <>
            <span className="glass-btn__shimmer" />
            <span className="glass-btn__content">{children}</span>
        </>
    );

    if (href) {
        if (href.startsWith("/")) {
            return (
                <Link to={href} className={classes} style={style} {...props}>
                    {content}
                </Link>
            );
        }
        return (
            <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={classes}
                style={style}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button type={type} disabled={disabled} className={classes} style={style} {...props}>
            {content}
        </button>
    );
}
