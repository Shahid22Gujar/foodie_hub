// src/components/Header.js
import { useContext } from "react";
import { Container, Navbar, Nav, Button, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../store/CartContext";

const Header = ({ onCartToggle }) => {
    const cartCtx = useContext(CartContext);

  const cartItemCount = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <Navbar bg="dark" variant="dark" className="px-4" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">FoodieHub</Navbar.Brand>
        <Nav className="ms-auto">
          <Button variant="outline-light" onClick={onCartToggle}>
            <FaShoppingCart />
            <span className="ms-2">Cart</span>
            <Badge bg="danger" className="ms-1">
              {cartItemCount}
            </Badge>
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
