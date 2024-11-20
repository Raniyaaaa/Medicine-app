import React, { useContext } from "react";
import CartContext from "../../CartContext";
import { Row, Col, Button, Container } from "react-bootstrap";

const MedicineList = () => {
    const cartCtx = useContext(CartContext);

    const addToCartHandler = (item) => {
        cartCtx.addToCart(item); // Optimistically add item to cart
    };

    const availableMedicines = cartCtx.items.filter((medicine) => medicine.Quantity > 0);
    return (
        <div style={{ padding: '3rem' }}>
            <Container style={{
                    borderRadius: '1rem',
                    padding: '2rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor:'#f4f3ed'
                }}>
            <h3 style={{color:'burlywood'}}><strong>Available Medicines</strong></h3>
            <Row style={{ marginBottom: "10px", marginTop: '2rem', textAlign: 'center',borderRadius: '1rem',backgroundColor: '#ffffff',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding:'1rem' }}>
                <Col md={1}>Name</Col>
                <Col md={2}>Description</Col>
                <Col md={1}>Price</Col>
                <Col md={1}>Quantity</Col>
            </Row>
            {availableMedicines.map((item) => (
                <Row key={item.id} style={{ marginBottom: "10px", textAlign: 'center',borderRadius: '1rem',backgroundColor: '#ffffff',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding:'1rem'  }}>
                    <Col md={1}>{item.Name}</Col>
                    <Col md={2}>{item.Description}</Col>
                    <Col md={1}>{item.Price}</Col>
                    <Col md={1}>{item.Quantity}</Col>
                    <Col md={2}>
                        <Button variant="light" onClick={() => addToCartHandler(item)} style={{color:'burlywood'}}><strong>Add To Cart</strong></Button>
                    </Col>
                </Row>
            ))}
            </Container>
        </div>  
    );
};

export default MedicineList;
