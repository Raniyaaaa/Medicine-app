import React, { useContext } from "react";
import CartContext from "../../CartContext";
import { Button, Row, Col, Modal } from "react-bootstrap";

const Cart = () => {
    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.cartItems.reduce(
        (sum, item) => sum + item.Price * item.Quantity,
        0
    );

    return (
        <div>
        <Modal show={cartCtx.showCart} onHide={cartCtx.toggleCart}>
            <Modal.Header closeButton style={{backgroundColor:'#f4f3ed'}}>
                <h2 style={{color:'#91b6b8'}}><strong>Your Cart</strong></h2>
            </Modal.Header>    
            <Modal.Body style={{backgroundColor:'#f4f3ed'}}>
            {cartCtx.cartItems.length === 0 ? (
                <p style={{color:'#91b6b8'}}><strong>Your cart is empty.</strong></p>
            ) : (
                <ul style={{ listStyleType: "none"}}>
                    <Row style={{ marginBottom: "15px", textAlign: "center" ,paddingRight:'2rem' }}>
                        <Col md={3}><strong>Name</strong></Col>
                        <Col md={3}><strong>Price</strong></Col>
                        <Col md={3}><strong>Quantity</strong></Col>
                        <Col md={3}><strong>Total</strong></Col>
                    </Row>
                    {cartCtx.cartItems.map((item) => (
                        <Row key={item.id} style={{ marginBottom: "10px", textAlign: "center",paddingRight:'2rem' }}>
                            <Col md={3}>{item.Name}</Col>
                            <Col md={3}>{item.Price}</Col>
                            <Col md={3}>{item.Quantity}</Col>
                            <Col md={3}>{(item.Price * item.Quantity).toFixed(2)}</Col>
                        </Row>
                    ))}
                </ul>
            )}
            <div style={{ textAlign: "right", marginTop: "10px" }}>
                <h4 style={{color:'#91b6b8'}}><strong>Total Amount: {totalAmount.toFixed(2)}</strong></h4>
                <Button variant="light" style={{color:'burlywood',marginTop:'10px'}}><strong>Place Order</strong></Button>
            </div>
            </Modal.Body>
        </Modal>
        </div>
    );
};

export default Cart;
