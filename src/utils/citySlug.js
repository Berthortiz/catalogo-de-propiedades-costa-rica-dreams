/**
 * citySlug — utilidades de ciudades para las páginas /ciudades.
 *
 * Las ciudades se derivan del campo "address" del JSON de propiedades,
 * salvo que una propiedad defina "city" para asignar su sección de catálogo.
 * Acepta direcciones con barrio ("Barrio, Cantón, Provincia, País") y
 * abreviadas sin barrio ("Cantón, Provincia, País").
 * Cada ciudad obtiene un slug amigable para URLs: sin acentos, en
 * minúsculas y con guiones en lugar de espacios ("Escazú" → "escazu",
 * "Santa Ana" → "santa-ana").
 *
 * Todo se calcula a partir del catálogo: al agregar propiedades de una
 * ciudad nueva al JSON, su página (/ciudades/<slug>) y su enlace en el
 * menú existen solos, sin tocar código.
 */

// La provincia se toma como penúltimo segmento para evitar que el país
// ("Costa Rica") llegue al filtro.
const ADDRESS_COUNTRY = "costa rica"

// Cantón/ciudad de la dirección ("Escazú", "Santa Ana", ...)
export const getCity = (product) => {
    const catalogCity = product.city?.trim()
    if (catalogCity) return catalogCity

    const parts = product.address
        ?.split(",")
        .map((part) => part.trim())
        .filter(Boolean) ?? []

    // Sin barrio, la dirección empieza directamente con el cantón.
    return parts.length >= 4 ? parts[1] : parts[0] ?? ""
}

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
