import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (productId, title, price, image, alt, quantity = 1) => {
        setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find((item) => item.id === productId);

        if (existingItem) {
            // Verifica que la cantidad no sea menor que cero
            const newQuantity = Math.max(existingItem.quantity + quantity, 0);
            return prevCartItems.map((item) =>
            item.id === existingItem.id
                ? { ...item, quantity: newQuantity}
                : item
            );
        } else {
            return [...prevCartItems, { id: productId, title, price, image, alt, quantity: 1 }];
        }
        });
    };
    const clearCart = ()=>{
        setCartItems([])
    }
    const [isOpenPayment, setIsOpenPayment] = useState(false);

    const openPaymentPage = () => {
        setIsOpenPayment(true);
    };

    const closePaymentPage = () => {
        setIsOpenPayment(false);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart, isOpenPayment, openPaymentPage, closePaymentPage }}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
