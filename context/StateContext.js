/** @format */

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext();

const StateContext = ({ children }) => {
  const [showCard, setShowCard] = useState(false);
  const [cardItems, setCardItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

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
      setCardItems([...cardItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

export default StateContext;
