import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../Navbar/Navbar";

function HomePg() {
  return (
    <div>
      <Navbar></Navbar>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h2>Home Page</h2>
    </div>
  );
}

export default HomePg;
