/**
 * citySlug — utilidades de ciudades para las páginas /ciudades.
 *
 * Las ciudades se derivan del campo "address" del JSON de propiedades
 * (formato "Barrio, Cantón, Provincia, País"), igual que hace useFilter.js.
 * Cada ciudad obtiene un slug amigable para URLs: sin acentos, en
 * minúsculas y con guiones en lugar de espacios ("Escazú" → "escazu",
 * "Santa Ana" → "santa-ana").
 *
 * Todo se calcula a partir del catálogo: al agregar propiedades de una
 * ciudad nueva al JSON, su página (/ciudades/<slug>) y su enlace en el
 * menú existen solos, sin tocar código.
 */

// Posiciones dentro de "Barrio, Cantón, Provincia, País". La provincia se
// toma como el penúltimo segmento para tolerar direcciones a las que les
// falte el barrio y evitar que el país ("Costa Rica") llegue al filtro.
const ADDRESS_CITY_INDEX = 1
const ADDRESS_COUNTRY = "costa rica"

// Cantón/ciudad de la dirección ("Escazú", "Santa Ana", ...)
export const getCity = (product) =>
    product.address?.split(",")[ADDRESS_CITY_INDEX]?.trim() ?? ""

// Provincia de la dirección ("San José", "Guanacaste", ...)
export const getProvince = (product) => {
    const parts = product.address
        ?.split(",")
        .map((part) => part.trim())
        .filter(Boolean) ?? []

    if (parts.length < 3) return ""

    const province = parts[parts.length - 2]
    return province.toLowerCase() === ADDRESS_COUNTRY ? "" : province
}

// "Santa Ana" → "santa-ana" | "Escazú" → "escazu"
export function cityToSlug(city) {
    return city
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // quita acentos/diacríticos
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
}

// Lista única de ciudades del catálogo, ordenada por cantidad de
// propiedades (más ofertas primero) y luego alfabéticamente.
export function getCitiesFromProducts(products) {
    const citiesBySlug = new Map()

    for (const product of products) {
        const city = getCity(product)
        if (!city) continue

        const slug = cityToSlug(city)
        const entry = citiesBySlug.get(slug) ?? {
            city,
            province: "",
            slug,
            count: 0,
        }

        // La provincia se toma de la primera propiedad que la tenga
        if (!entry.province) entry.province = getProvince(product)

        entry.count += 1
        citiesBySlug.set(slug, entry)
    }

    return [...citiesBySlug.values()].sort(
        (a, b) => b.count - a.count || a.city.localeCompare(b.city, "es")
    )
}

// Resuelve el slug de la URL contra las ciudades del catálogo.
// Devuelve { city, province, slug, count } o null si no existe.
export function findCityBySlug(products, slug) {
    return getCitiesFromProducts(products).find((entry) => entry.slug === slug) ?? null
}
