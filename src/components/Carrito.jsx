import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { CartIcon, ClearCartIcon, CartIconDelete } from "./Icons";
import ProductQuantity from "./ProductDetailsPage/ProductQuantity";
import { formatPrice } from "../utils/formatPrice";

export default function Carrito() {
  const { cart, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false)
  const { removeFromCart } = useCart()




  const { productsIncart, totalCart } = cart.reduce((sum, item) => {

    sum.productsIncart += item.quantity
    sum.totalCart += item.quantity * item.price.amount

    return sum
  }, { productsIncart: 0, totalCart: 0 })

  console.log(cart);




  return (
    <>

      {/* transform: cartOpen ? 'translateX(0)' : 'translateX(0)' */}
      <button onClick={() => setCartOpen(!cartOpen)} className="label-input-cart fixed top-[5em] left-4 z-20 bg-primary p-2 rounded-lg text-white" htmlFor="inputCart">
        <span style={{
          transform: `scale( ${cart.length <= 0 ? 0 : 1.0})`,
          transition: 'all .2s ease-out '
        }}
          className="absolute top-[-1em] right-[-1em] bg-red-600 rounded-[30px] w-[2em] h-[2em] p-[1.1em] text-[.8em] flex items-center justify-center " >{productsIncart}</span>
        <CartIcon />
      </button>

      <aside style={{ right: cartOpen ? '0px' : '-24em' }} className={` aside-cart w-[var(--width-cart)] h-full bg-white fixed top-0 z-10 flex flex-col items-center justify-between py-4 p-4 border-l-[1px] `}>
        <section className="w-full" >
          <div className="pt-5 px-6 flex justify-between" >
            <h2 className="">Cart</h2>
            <button onClick={clearCart}>
              <ClearCartIcon />
            </button >
          </div>
          <ul className="w-full pt-6 " >
            {
              cart.map((item) => {

                return (
                  <li id={item.id} key={item.id} className={`${" w-[100%] flex flex-row justify-between border-t-[1px] px-6 py-5 text-sm "}  `}  >

                    <div className=" flex flex-col">
                      <strong>{item.title}</strong>
                      <span className="pb-3">{formatPrice(item.price)}</span>

                      <footer className="flex gap-2">

                        <ProductQuantity productInCart={item} />
                        <button onClick={() => removeFromCart(item)}>

                          <CartIconDelete />

                        </button>
                      </footer>
                    </div>

                    <img className="w-[5em] object-cover" src={item.images[0]} alt={item.title} />

                  </li>

                )


              })}
          </ul>

        </section>


        <footer className="border-t-[1px] w-full px-6 ">
          <div className=" flex justify-between py-5 text-primary " >
            <div >Subtotal</div>
            <div><strong>{formatPrice({ amount: totalCart, currency: cart[0]?.price.currency ?? 'USD' })}</strong></div>
          </div>
          <div className=" flex flex-col gap-3" >
            <button className='bg-transparent border-2 border-primary rounded-lg text-primary p-2 flex justify-center w-full'> Ver Carrito </button>
            <button className='bg-primary border-2 border-primary rounded-lg text-white p-2 flex justify-center w-full'>Finalizar Compra</button>

          </div>


        </footer>

      </aside>
      {/* <div id='overlay-cart' onClick={() => setCartOpen(!cartOpen)} className={`${cartOpen ? 'block' : 'hidden'} w-full h-full bg-black opacity-30 fixed z-[8] top-0 `}> </div> */}

    </>
  );
}






