import React, { useContext } from "react";
import CartContext from "../../CartContext";
import { Button, Row, Col, Modal } from "react-bootstrap";

const Cart = () => {
    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Modal show={cartCtx.showCart} onHide={cartCtx.toggleCart}style={{ padding: "2rem", background: "#f9f9f9", borderRadius: "8px" }}>
            <Modal.Header closeButton>
                <h2>Your Cart</h2>
            </Modal.Header>    
            <Modal.Body>
            {cartCtx.cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    <Row style={{ marginBottom: "10px", textAlign: "center" }}>
                        <Col md={3}><strong>Name</strong></Col>
                        <Col md={3}><strong>Price</strong></Col>
                        <Col md={3}><strong>Quantity</strong></Col>
                        <Col md={3}><strong>Total</strong></Col>
                    </Row>
                    {cartCtx.cartItems.map((item) => (
                        <Row key={item.id} style={{ marginBottom: "10px", textAlign: "center" }}>
                            <Col md={3}>{item.name}</Col>
                            <Col md={3}>{item.price}</Col>
                            <Col md={3}>{item.quantity}</Col>
                            <Col md={3}>{(item.price * item.quantity).toFixed(2)}</Col>
                        </Row>
                    ))}
                </ul>
            )}
            <div style={{ textAlign: "right", marginTop: "1rem" }}>
                <h4>Total Amount: {totalAmount.toFixed(2)}</h4>
                <Button variant="primary">Place Order</Button>
            </div>
            </Modal.Body>
        </Modal>
    );
};

export default Cart;
