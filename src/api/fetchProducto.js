import listings from "../services/listings.json";

export const fetchProduct = async () =>
  (listings.properties ?? []).filter((property) => property.oculta !== true);