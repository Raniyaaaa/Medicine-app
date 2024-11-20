import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CartContext from "../../CartContext";
import MedicineList from "./MedicineList";

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
        <section style={{ backgroundColor: '#91b6b8', padding: '2rem' }}>
            <Container
                style={{
                    borderRadius: '1rem',
                    padding: '2rem',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundImage: `url('https://thumbs.dreamstime.com/b/set-cute-simple-line-drawings-featuring-various-types-sizes-pills-pastel-colors-white-background-design-326114935.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <form style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' ,paddingTop:'2rem',paddingBottom:'2rem'}} onSubmit={formsubmitHandler}>
                    <label htmlFor="name" ><strong>Medicine Name</strong>
                        <input type="text" id="name" required value={medname} onChange={(e) => setMedName(e.target.value)} style={{ borderRadius: '1rem' }} />
                    </label>
                    <label htmlFor="description"><strong>Description</strong>
                        <input type="text" id="description" required value={descri} onChange={(e) => setDescri(e.target.value)} style={{ borderRadius: '1rem' }} />
                    </label>
                    <label htmlFor="price"><strong>Price</strong>
                        <input type="number" id="price" required value={price} onChange={(e) => setPrice(e.target.value)} style={{ borderRadius: '1rem' }} />
                    </label>
                    <label htmlFor="quantity"><strong>Quantity</strong>
                        <input type="number" id="quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ borderRadius: '1rem' }} />
                    </label>
                    <Button variant="light" type="submit" style={{color:'burlywood'}}><strong>Add Product</strong></Button>
                </form>
            </Container>
            <MedicineList />
        </section>
    );
};

export default MedicineForm;
