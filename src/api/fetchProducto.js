import listings from "../services/listings.json";

export const fetchProduct = async () => listings.properties ?? [];