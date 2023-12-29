import React from 'react';
import "../styles/CartPage.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CancelPresentationRoundedIcon from '@mui/icons-material/CancelPresentationRounded';
import { useCart } from './CartContext';
import PaymentPage from './PaymentPage';
import { useState } from 'react';

function CartPage({ isOpen, onClose}) {
    const { openPaymentPage } = useCart()

    const { cartItems, clearCart, addToCart } = useCart();

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };
    
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        // agregar aca lógica de descuento
        return subtotal;
    };

    const updateItemQuantity = (productId, newQuantity) => {
        addToCart(productId, null, null, null, null, newQuantity);
    };

    return (
        <div className={`modal ${isOpen ? 'active' : ''}`} id="jsModalCarrito">
            <div className="modal__container">
                <CancelPresentationRoundedIcon
                className="modal__close fa-solid fa-xmark jsModalClose "
                color='inherit'
                onClick={onClose}
                />

                <div className="modal__info">
                    <div className="modal__header">
                        <h2>Cart</h2>
                    </div>

                    <div className="modal__body">
                        {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                        ) : (
                        <div className="modal__list">
                            {cartItems.map((item) => (
                            <div key={item.id} className="modal__item">
                                <div className="modal__thumb">
                                    <img src={item.image} alt={item.alt} />
                                </div>
                                <div className="modal__text-product">
                                    <p>{item.title}</p>
                                        <span>Amount: {item.quantity}</span>
                                        <div className="button-container">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => updateItemQuantity(item.id, 1)}
                                            >
                                                +
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => updateItemQuantity(item.id, -1)}
                                            >
                                                -
                                            </Button>
                                        </div>
                                    <p>Total</p>
                                    <strong>${item.price*item.quantity}</strong>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                    </div>

                    {cartItems.length > 0 && (
                    <div className="modal__footer">
                        <div className="modal__list-price">
                        <ul>
                            <li>Subtotal: <strong>${calculateSubtotal()}</strong></li>
                            <li>Discount: <strong>$0.00</strong></li>
                        </ul>
                        <h4 className="modal__total-cart"> Total: ${calculateTotal()}</h4>
                        </div>

                        <div className="modal__btns">
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={clearCart} >Clear Cart</Button>
                                <Button variant="contained" onClick={openPaymentPage}>Buy Now</Button>
                            </Stack>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartPage;
