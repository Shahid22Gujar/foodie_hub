import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header'
import Meals from './components/Meals';
import CartModal from "./components/CartModal";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0); // This will be managed with context later
  const toggleCartHandler = () => {
    setShowCart((prev) => !prev);
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };
  const [cartItems, setCartItems] = useState([]);

  const addToCartHandler = (meal) => {
    setCartItems((prevItems) => [...prevItems, meal]);
  };
  
  return (
    <>
  
      <Header cartCount={cartCount} onCartToggle={toggleCart} />
      <Meals onAddToCart={addToCartHandler} />
       <ToastContainer />
      {showCart && <CartModal show={showCart} onClose={toggleCartHandler} />}
  
    </>
  )
}

export default App
