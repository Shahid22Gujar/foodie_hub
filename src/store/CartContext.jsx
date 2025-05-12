// src/store/CartContext.js
import React, { useReducer, createContext,useEffect } from "react";
import { toast } from "react-toastify";  // Import toast
// Initial state for the cart
const initialCartState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalAmount: JSON.parse(localStorage.getItem("cartTotal")) || 0,
};

// Cart reducer function to manage cart actions
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      toastMessage: `${action.item.name} added to the cart!`, // Set toast message here
    };
  }
  if (action.type === "REMOVE_ITEM") {
  
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    if (existingCartItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount < 0 ? 0 : updatedTotalAmount,
        toastMessage: "Item removed from the cart", // Set toast message here
    };
  }
  if (action.type === "CLEAR_CART") {

    return {
      items: [],
    totalAmount: 0,      
  toastMessage: "Cart cleared!", // Set toast message here
    };
  }

  return state;
};

// Create context
export const CartContext = createContext();

// Cart Provider component
const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCart = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };

  
  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

   // Show toast only once, when state changes
  useEffect(() => {
    if (cartState.toastMessage) {
      toast.success(cartState.toastMessage); // Trigger toast here
    }
  }, [cartState.toastMessage]); // Only trigger when toastMessage changes

  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartState.items));
    localStorage.setItem("cartTotal", JSON.stringify(cartState.totalAmount));
  }, [cartState]);
  
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
     clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
