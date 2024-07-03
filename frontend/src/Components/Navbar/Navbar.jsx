import React, { useState } from "react";
import styles from "./Navbar.module.css";
import appLogo from "../../Assets/Icons/appLogo.png";
import boardIcon from "../../Assets/Icons/boardIcon.png";
import analyticsIcon from "../../Assets/Icons/analyticsIcon.png";
import settingsIcon from "../../Assets/Icons/settingsIcon.png";
import logoutIcon from "../../Assets/Icons/Logout.png";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../Modal/LogoutModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navBrand}>
        <img src={appLogo} alt="app-logo" style={{ height: "3.5vh" }} />
        <p className={styles.logoHeading}>Pro Manage</p>
      </div>

      <div className={styles.navMenu}>
        <div
          className={styles.menuItem}
          id={location.pathname === "/" ? styles.selected : ""}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={boardIcon} alt="boards" style={{ height: "3vh" }} />
          <p>Board</p>
        </div>

        <div
          className={styles.menuItem}
          id={location.pathname === "/analytics" ? styles.selected : ""}
          onClick={() => {
            navigate("/analytics");
          }}
        >
          <img src={analyticsIcon} alt="analytics" style={{ height: "3vh" }} />
          <p>Analytics</p>
        </div>

        <div
          className={styles.menuItem}
          id={location.pathname === "/settings" ? styles.selected : ""}
          onClick={() => {
            navigate("/settings");
          }}
        >
          <img src={settingsIcon} alt="settings" style={{ height: "3vh" }} />
          <p>settings</p>
        </div>
      </div>

      <div className={styles.navFooter}>
        <div className={styles.footerItem} onClick={openModal}>
          <img src={logoutIcon} alt="boards" style={{ height: "2.5vh" }} />
          <p>Log out</p>
        </div>
      </div>
      <LogoutModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default Navbar;
