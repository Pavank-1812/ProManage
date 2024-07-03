import Modal from "react-modal";
import React from "react";
import styles from "./ModalStyles.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Store/Slices/userSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    borderRadius: "1rem",
    width: "25vw",
    height: "25vh",
    padding: "2vh 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifycontent: "space-around",
  },
  overlay: {
    backgroundColor: "#303D438C",
  },
};
Modal.setAppElement("#root");
const LogoutModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <p className={styles.text}>Are you sure you want to Logout?</p>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Yes, Logout
      </button>
      <button className={styles.cancelButton} onClick={closeModal}>
        Cancel
      </button>
    </Modal>
  );
};

export default LogoutModal;
