import React from "react";
import notFound from "../../Assets/Images/NotFound.jpg";

const NotFound = () => {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <img
        src={notFound}
        alt="page-not-found"
        style={{
          height: "70vh",
          "box-shadow": "0 10px 20px rgba(0, 0, 0, 0.3)",
        }}
      />
    </div>
  );
};

export default NotFound;
