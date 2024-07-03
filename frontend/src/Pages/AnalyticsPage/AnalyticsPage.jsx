import React from "react";
import Analytics from "../../Components/Analytics/Analytics";
import Navbar from "../../Components/Navbar/Navbar";

const AnalyticsPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <Analytics />
    </div>
  );
};

export default AnalyticsPage;
