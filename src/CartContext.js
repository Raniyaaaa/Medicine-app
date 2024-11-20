import React from "react"

const CartContext=React.createContext({
    items:[],
    addItem:(name,decsiption,price,quantity)=>{},
    toggleCart: () => {}, 
    addToCart:(id)=>{},
    cartItems:[],
    showCart:false,
    fetchItems: ()=> {},
    fetchCartItems : () => {}
})
export default CartContext;