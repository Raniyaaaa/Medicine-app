import React, { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import CartContext from "../../CartContext";

const Header = () => {
    const cartCtx = useContext(CartContext);
    const cartQuantity = cartCtx.cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div>
            <Navbar  expand="sm"  style={{ justifyContent:'center',color:'lightblue'}}>
            <Container className="d-flex justify-content-between align-items-center">
                <h1>MEDICINE...</h1>
                <Button variant="outline-info" onClick={cartCtx.toggleCart}>
                    CART ({cartQuantity})
                </Button>
            </Container>
            </Navbar>
        </div>
    );
};

export default Header;