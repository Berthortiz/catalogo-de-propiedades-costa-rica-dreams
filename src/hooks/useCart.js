import { useContext } from "react";
import { CartContext } from "../contexts/Cart";


// get context
export const useCart = () => {
    const context = useContext(CartContext)
    const { cart, addToCart, clearCart, removeFromCart, removeFromCartItem } = useContext(CartContext)
    if (context === undefined) {
        throw new Error('Usecart no esta siendo consumido por el provider')
    }


    return { cart, addToCart, clearCart, removeFromCart, removeFromCartItem }


}