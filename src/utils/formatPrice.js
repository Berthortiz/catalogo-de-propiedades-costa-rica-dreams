export const formatPrice = ({ amount, currency = "USD", period }) => {
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0
    }).format(amount)

    return period === "month" ? `${formattedPrice} / Mes` : formattedPrice
}