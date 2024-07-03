import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Home from "../../Components/Home/Home";

const HomePage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <Home />
    </div>
  );
};

export default HomePage;
