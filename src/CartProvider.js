import React, { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    

    const addItem = (name, description, price, quantity) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.name === name && item.description === description && item.price === price
            );

            if (existingItemIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: parseInt(updatedItems[existingItemIndex].quantity) + parseInt(quantity),
                };
                return updatedItems;
            } else {
                return [
                    ...prevItems,
                    { name, description, price, quantity, id: Math.random() },
                ];
            }
        });
    };

    const addToCart = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(item => item.id === id);
            if (existingCartItem) {
                return prevCartItems.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                const itemToAdd = items.find(item => item.id === id);
                if (itemToAdd) {
                    return [...prevCartItems, { ...itemToAdd, quantity: 1 }];
                }
            }
            return prevCartItems;
        });
    };

    const toggleCartHandler = () => {
        setShowCart((prevShowCart) => !prevShowCart);
    };

    const cartContextValue = {
        items: items,
        addItem: addItem,
        toggleCart: toggleCartHandler,
        addToCart: addToCart,
        cartItems: cartItems,
        showCart: showCart,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
