/** @format */

import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const HeroBanner = ({ HeroBanner }) => {
  const {
    smallText,
    midText,
    largeText1,
    largeText2,
    buttonText,
    desc,
    image,
    product,
  } = HeroBanner;

  

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <img
          src={urlFor(image)}
          alt="headphones"
          className="hero-banner-image"
        />
        <div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="desc">
            <h5>{largeText2}</h5>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
