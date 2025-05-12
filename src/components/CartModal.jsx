// src/components/CartModal.js
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Modal, Button, ListGroup, Image } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";
import { CartContext } from "../store/CartContext";
import "./CartModal.css"; // Custom styles for transition

// Portal target in public/index.html
const portalElement = document.getElementById("overlays");

const CartModal = ({ show, onClose }) => {
  const cartCtx = useContext(CartContext);
  // src/components/CartModal.js
 const clearCartHandler = () => {
  if (window.confirm("Are you sure you want to clear the cart?")) {
    cartCtx.clearCart();
  }
};

  return ReactDOM.createPortal(
    <CSSTransition in={show} timeout={300} classNames="fade" unmountOnExit>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="cart-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {cartCtx.items.length === 0 ? (
              <p className="text-center text-muted">Your cart is empty.</p>
            ) : (
              cartCtx.items.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center py-3 flex-column flex-md-row"
                >
                  <div className="d-flex align-items-center mb-2 mb-md-0">
                    <Image
                      src={item.image}
                      roundedCircle
                      className="me-3"
                      height={150}
                      width={150}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <p className="mb-0 text-muted small">{item.description.slice(0,100)}...</p>
                      <p className="mb-0"><strong>${item.price.toFixed(2)}</strong></p>
                    </div>
                  </div>
                  <div className="text-end mt-2 mt-md-0">
                    <div>x {item.quantity}</div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => cartCtx.removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between flex-column flex-md-row">
          <h5 className="mb-2 mb-md-0">
            Total: <strong>${cartCtx.totalAmount.toFixed(2)}</strong>
          </h5>
          <div className="d-flex flex-column flex-md-row gap-2">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="danger" onClick={clearCartHandler}>
              Clear Cart
            </Button>
            <Button variant="primary" onClick={() =>{
              if(cartCtx.items.length){
                alert("Order Placed!")
                cartCtx.clearCart();
              }
              else{
                alert("Cart is empty!")
              }
             
            }}>
              Order Now
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </CSSTransition>,
    portalElement
  );
};

export default CartModal;
