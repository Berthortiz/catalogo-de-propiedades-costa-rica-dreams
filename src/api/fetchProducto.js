
export const fetchProduct = async () => {


    try {

        const response = await fetch('/src/services/listings.json')
        if (!response.ok) {
            throw new Error(`No se pudo cargar el catálogo: ${response.status}`)
        }
        const data = await response.json()
        return data.properties ?? []

    }
    catch (error) {
        console.error("No se pudieron cargar las propiedades", error)
        return []
    }




}