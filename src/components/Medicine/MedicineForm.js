import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CartContext from "../../CartContext";

const MedicineForm = () => {
    const cartCtx = useContext(CartContext);
    const [medname, setMedName] = useState('');
    const [descri, setDescri] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const formsubmitHandler = (event) => {
        event.preventDefault();
        cartCtx.addItem(medname, descri, price, quantity);
        setMedName('');
        setDescri('');
        setPrice('');
        setQuantity('');
    };

    return (
        <Container style={{ paddingBottom: '2rem', paddingTop: '4rem' }}>
            <form style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }} onSubmit={formsubmitHandler}>
                <label htmlFor="name">Medicine Name
                    <input type="text" id="name" required value={medname} onChange={(e) => setMedName(e.target.value)} style={{ borderRadius: '1rem' }} />
                </label>
                <label htmlFor="description">Description
                    <input type="text" id="description" required value={descri} onChange={(e) => setDescri(e.target.value)} style={{ borderRadius: '1rem' }} />
                </label>
                <label htmlFor="price">Price
                    <input type="number" id="price" required value={price} onChange={(e) => setPrice(e.target.value)} style={{ borderRadius: '1rem' }} />
                </label>
                <label htmlFor="quantity">Quantity
                    <input type="number" id="quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ borderRadius: '1rem' }} />
                </label>
                <Button variant="primary" type="submit">Add Product</Button>
            </form>
        </Container>
    );
};

export default MedicineForm;
