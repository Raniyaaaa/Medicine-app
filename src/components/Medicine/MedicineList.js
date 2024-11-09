import React, { useContext } from "react";
import CartContext from "../../CartContext";
import { Row, Col, Button } from "react-bootstrap";

const MedicineList = () => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (id) => {
        cartCtx.addToCart(id);
    };

    return (
        <div style={{padding:'3rem'}}>
            <h3>Available Medicines</h3>
            <ul>
                <Row style={{ marginBottom: "10px",marginTop:'2rem', textAlign:'center'}}>
                <Col md={1}>Name</Col>
                <Col md={1}>Description</Col>
                <Col md={1}>Price</Col>
                <Col md={1}>Quantity</Col>
                </Row>
                {cartCtx.items.map((item) => (
                    <Row key={item.id} style={{ marginBottom: "10px",textAlign:'center'}}>
                        <Col md={1}>{item.name}</Col>
                        <Col md={1}>{item.description}</Col>
                        <Col md={1}>{item.price}</Col>
                        <Col md={1}>{item.quantity}</Col>
                        <Col md={2}>
                            <Button variant="primary" onClick={() => addToCartHandler(item.id)}>Add to Cart</Button>
                        </Col>
                    </Row>
                ))}
            </ul>
        </div>
    );
};

export default MedicineList;
