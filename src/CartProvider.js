import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const base_url = "https://react-cart-example-default-rtdb.firebaseio.com/Medicines.json";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [itemsResponse, cartResponse] = await Promise.all([
                    axios.get(base_url),
                    axios.get("https://react-cart-example-default-rtdb.firebaseio.com/Cart.json")
                ]);
    
                const loadedItems = Object.keys(itemsResponse.data || {}).map((key) => ({
                    id: key,
                    ...itemsResponse.data[key],
                }))
                // const availableMedicines = loadedItems.filter((medicine) => medicine.Quantity > 0);
                const loadedCartItems = Object.keys(cartResponse.data || {}).map((key) => ({
                    id: key,
                    ...cartResponse.data[key],
                }));
    
                setItems(loadedItems);
                setCartItems(loadedCartItems);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [items]);
    
    const addItem = async (name, description, price, quantity) => {
        const existingItemIndex = items.findIndex(
            (item) => item.Name === name && item.Description === description && item.Price === price
        );

        if (existingItemIndex !== -1) {
            const updatedItem = {
                ...items[existingItemIndex],
                Quantity: parseInt(items[existingItemIndex].Quantity) + parseInt(quantity),
            };

            try {
                await axios.put(
                    `https://react-cart-example-default-rtdb.firebaseio.com/Medicines/${items[existingItemIndex].id}.json`,
                    updatedItem
                );
                setItems((prevItems) => prevItems.map((item) =>
                    item.id === updatedItem.id ? updatedItem : item
                ));
            } catch (error) {
                console.error("Error updating item:", error);
            }
        } else {
            const newItem = { Name: name, Description: description, Price: price, Quantity: quantity};
            try {
                const response = await axios.post(base_url, newItem);
                setItems((prevItems) => [
                    ...prevItems,
                    { ...newItem, id: response.data.name },
                ]);
            } catch (error) {
                console.error("Error adding item:", error);
            }
        }
    };

    const addToCart = async (i) => {
        const existingItemIndex = cartItems.findIndex(
            (item) => item.Name === i.Name && item.Description === i.Description && item.Price === i.Price
        );

        const newItem = { Name: i.Name, Description: i.Description, Price: i.Price, Quantity: 1};

        if (existingItemIndex !== -1) {
            const updatedItem = {
                ...cartItems[existingItemIndex],
                Quantity: parseInt(cartItems[existingItemIndex].Quantity) + 1,
            };

            try {
                await axios.put(
                    `https://react-cart-example-default-rtdb.firebaseio.com/Cart/${cartItems[existingItemIndex].id}.json`,
                    updatedItem
                );
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    )
                );
            } catch (error) {
                console.error("Error updating cart item:", error);
            }
        } else {
            try {
                const response = await axios.post(`https://react-cart-example-default-rtdb.firebaseio.com/Cart.json`, newItem);
                setCartItems((prevItems) => [
                    ...prevItems,
                    { ...newItem, id: response.data.name }
                ]);
            } catch (error) {
                console.error("Error adding cart item:", error);
            }
        }

        addItem(i.Name, i.Description, i.Price, -1);
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
        loading: loading,
    };

    return (
        <CartContext.Provider value={cartContextValue}>
            {loading ? <p>Loading...</p> : props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
