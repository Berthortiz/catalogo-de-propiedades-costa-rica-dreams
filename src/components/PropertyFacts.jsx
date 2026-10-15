import { PropertyFactIcon } from "./Icons";

const fallbackFacts = (specifications = {}) => [
    { icon: "bedrooms", label: "Habitaciones", value: specifications.bedrooms },
    { icon: "bathrooms", label: "Baños", value: specifications.bathrooms },
    { icon: "parking", label: "Parqueos", value: specifications.garage },
    { icon: "area", label: "Área", value: specifications.sqFt, unit: "sq ft" }
];

const formatValue = (value) => typeof value === "number"
    ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)
    : value;

export default function PropertyFacts({ property, className = "", compact = false }) {
    const facts = (property.facts?.length ? property.facts : fallbackFacts(property.specifications))
        .filter((fact) => fact.value !== null && fact.value !== undefined && fact.value !== "");

    const visibleFacts = compact
        ? facts.filter((fact) => !fact.label.toLowerCase().includes("servicio"))
            .filter((fact, index, list) => list.findIndex((item) => item.icon === fact.icon) === index)
            .slice(0, 4)
        : facts;

    if (visibleFacts.length === 0) return null;

    return (
        <ul className={`property-facts ${className} ${compact ? "property-facts--compact" : ""}`}>
            {visibleFacts.map((fact, index) => (
                <li key={`${fact.icon}-${fact.label}-${index}`} className="property-fact">
                    <PropertyFactIcon name={fact.icon} />
                    <span className="property-fact__text">
                        <strong>{formatValue(fact.value)}{fact.unit ? ` ${fact.unit}` : ""}</strong>
                        <span>{fact.label}</span>
                    </span>
                </li>
            ))}
        </ul>
    );
}