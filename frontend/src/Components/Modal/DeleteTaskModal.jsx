import Modal from "react-modal";
import React from "react";
import styles from "./ModalStyles.module.css";

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
const DeleteTaskModal = ({ isOpen, closeModal, handleDelete, taskId }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <p className={styles.text}>Are you sure you want to Delete?</p>
      <button
        className={styles.logoutButton}
        onClick={() => {
          handleDelete(taskId);
        }}
      >
        Yes, Delete
      </button>
      <button className={styles.cancelButton} onClick={closeModal}>
        Cancel
      </button>
    </Modal>
  );
};

export default DeleteTaskModal;
