/** @format */

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext();

const StateContext = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

    
    /* ========================== ADD TO CART ========================== */
  const onAdd = (product, quantity) => {
    const checkProductInCard = cardItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCard) {
      const updatedCartItems = cardItems.map((cardProduct) => {
        if (cardProduct._id === product._id)
          return {
            ...cardProduct,
              quantity: cardProduct.quantity + quantity,
          };
      });

      setCardItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCardItems([...cardItems, { ...product, position: cardItems.length }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

    
    /* =================== REMOTE CART ITEM =================== */

    const onRemove = (product) => { 
        let newCartItems = cardItems.filter((item) => item._id !== product._id);
        
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - product.quantity);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price * product.quantity);

        setCardItems(newCartItems);
    }
    
    /* ================== INC & DEC QUANTITY FROM CART ==================== */
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cardItems.find((item) => item._id === id);
    index = cardItems.findIndex((item) => item._id === id);
    let newCartItems = cardItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCardItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCardItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCard,
        cardItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCard,
        toggleCartItemQuantity,
        onRemove,
        setCardItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

export default StateContext;
