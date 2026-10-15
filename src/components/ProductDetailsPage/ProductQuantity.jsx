
import { useCart } from "../../hooks/useCart"
import PropTypes from "prop-types"
// import useProductDetails from "../../hooks/useProductDetails"


export default function ProductQuantity({ productInCart }) {
    const { cart, removeFromCartItem, addToCart, removeFromCart } = useCart()
    const productQuantity = cart?.find((item) => item?.id === productInCart?.id)

    // console.log(productInCart)

    return (
        <div className=" border-[1px] rounded-md px-2 py-1 w-fit flex gap-2">
            <button onClick={() => {
                if (!productQuantity) {
                    return
                }

                if (productQuantity?.quantity <= 1) {
                    removeFromCart(productInCart)
                } else {
                    removeFromCartItem(productInCart)
                }

            }

            } aria-label="Reducir cantidad">-</button>
            <p>Cantidad: {productQuantity ? productQuantity.quantity : '0'}</p>
            <button onClick={() => addToCart(productInCart)} aria-label="Aumentar cantidad" disabled={!productInCart.available}>+</button>
        </div>
    )
}

ProductQuantity.propTypes = {
    productInCart: PropTypes.shape({
        id: PropTypes.number.isRequired,
        available: PropTypes.bool.isRequired
    }).isRequired
}