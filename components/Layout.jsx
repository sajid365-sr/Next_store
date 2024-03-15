/** @format */

import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import { Footer } from ".";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Driplare</title>
        <link rel="icon" href="logo.png" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
