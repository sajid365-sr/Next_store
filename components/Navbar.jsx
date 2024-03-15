/** @format */

import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";

const Navbar = () => {
  const { showCard, setShowCard, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <Link href="/" className="logo">
        <Image src="/logo_1.png" width="160" height="40" />
      </Link>

      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCard(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCard && <Cart />}
    </div>
  );
};

export default Navbar;
