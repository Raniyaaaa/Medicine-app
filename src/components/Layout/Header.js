import React, { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import CartContext from "../../CartContext";

const Header = () => {
    const cartCtx = useContext(CartContext);
    const cartQuantity = cartCtx.cartItems.reduce((total, item) => total + item.Quantity, 0);

    return (
        <header style={{backgroundColor:'#f4f3ed'}}>
            <Navbar  expand="sm"  style={{ justifyContent:'center',color:'burlywood'}}>
            <Container className="d-flex justify-content-between align-items-center">
                <h1>MEDICINE...</h1>
                <Button variant="light" onClick={cartCtx.toggleCart} style={{color:'burlywood'}}>
                    <strong>CART ({cartQuantity})</strong>
                </Button>
            </Container>
            </Navbar>
        </header>
    );
};

export default Header;