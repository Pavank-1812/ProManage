import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Settings from "../../Components/Settings/Settings";

const SettingsPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <Settings />
    </div>
  );
};

export default SettingsPage;
