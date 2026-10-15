import PropTypes from "prop-types";
import { formatPrice } from "../utils/formatPrice";

export default function WhatsAppButton({ property, className }) {
    const propertyUrl = `${window.location.origin}/products/${property.id}`;
    const message = [
        `Hola, me interesa la propiedad ${property.title}.`,
        `Precio: ${formatPrice(property.price)}.`,
        `Disponibilidad: ${property.available ? "Disponible" : "No disponible"}.`,
        `Ubicación: ${property.address}.`,
        `Más información: ${propertyUrl}`
    ].join("\n");

    return (
        <a
            className={className}
            href={`https://wa.me/?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Consultar ${property.title} por WhatsApp`}
        >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a9.8 9.8 0 0 0-8.35 14.94L2.5 22l5.2-1.1A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-3.08.65.66-3-.19-.3A8 8 0 1 1 12 20Zm4.4-5.98c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
            </svg>
            Consultar por WhatsApp
        </a>
    );
}

WhatsAppButton.propTypes = {
    property: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired,
        price: PropTypes.shape({
            amount: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            period: PropTypes.string
        }).isRequired
    }).isRequired,
    className: PropTypes.string.isRequired
};