/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";


export const CartContext = createContext()


// useReducer
const initialCart = [] // el estado inicial va afuera del reducer ppero dentro del contexto --- por ahora





const reducer = (state, action) => {



  const { type: actionType, payload: actionPayload } = action

  // el payloade es equivalente al producto dentro del action
  switch (actionType) {

    case 'ADD_TO_CART': {


      const productIncartIndex = state.findIndex((item) => {

        return (item.id === actionPayload.id)
      })


      if (productIncartIndex === -1) {
        return [
          ...state, { // los demas productos en el carrito
            ...actionPayload, // product
            quantity: 1
          }
          // Para agregar un atributo nuevo(quantity) usar el sprit operator 
          // para meter todo el carrito
          // y modificar un solo atributo
        ]

      }

      // SI el atributo ya existe y quiero sumarle o hacer le modificaciones
      // hay que clonar el estado
      const newState = structuredClone(state)
      newState[productIncartIndex].quantity += 1

      return newState



    }

    case 'REMOVE_FROM_CART_ITEM': {


      const productIncartItemIndex = state.findIndex((item) => {
        return (item.id === actionPayload.id)
      })



      const newStateCartItem = structuredClone(state)



      if (newStateCartItem[productIncartItemIndex].quantity === 0) {

        newStateCartItem[productIncartItemIndex].quantity = 0



        return newStateCartItem
      }

      newStateCartItem[productIncartItemIndex].quantity -= 1

      return newStateCartItem



    }

    case 'REMOVE_FROM_CART': { // encapsula todo lo que no sea este prosucto, y devuelvelos en un array = asi se elimina.
      return state.filter(item => item.id !== actionPayload.id)
    }



    case 'CLEAR_CART': {


      return initialCart
    }
  }


  return state
}


export default function CartProvider({ children }) {

  const [state, dispatch] = useReducer(reducer, initialCart)

  const addToCart = (product) => dispatch({
    type: 'ADD_TO_CART',
    payload: product

  })

  const removeFromCartItem = (product) => dispatch({
    type: 'REMOVE_FROM_CART_ITEM',
    payload: product

  })



  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })



  return (


    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCartItem,
      clearCart,
      removeFromCart
    }
    }>

      {children}
    </CartContext.Provider>

  )

}