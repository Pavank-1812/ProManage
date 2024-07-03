import React, { useState } from "react";
import styles from "./Settings.module.css";
import nameIcon from "../../Assets/Icons/nameIcon.png";
import emailIcon from "../../Assets/Icons/mailIcon.png";
import passwordIcon from "../../Assets/Icons/passwordIcon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { updateUser } from "../../Store/Slices/userSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

const Settings = () => {
  const dispatch = useDispatch();

  const [updateData, setUpdateData] = useState({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    oldPassword: "",
    newPassword: "",
  });

  const [inputError, setInputError] = useState({
    oldPassword: "",
    newPassword: "",
    email: "",
  });

  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
  });

  const [updating, setUpdating] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateData({ ...updateData, [name]: value });
    setInputError({});
  };

  const handleUpdate = async () => {
    if (updateData.newPassword && !updateData.oldPassword) {
      setInputError({
        oldPassword: "* Old password is required!",
        newPassword: "",
      });
      return;
    }
    if (
      updateData.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(updateData.email)
    ) {
      setInputError({
        ...inputError,
        email: "* Invalid email address!",
      });
      return;
    }

    setUpdating(true);

    localStorage.setItem("name", updateData.name);
    localStorage.setItem("email", updateData.email);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    dispatch(updateUser(updateData));

    setUpdateData({
      name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
    });
    setInputError({});
    setPasswordVisible({
      oldPassword: false,
      newPassword: false,
    });

    setUpdating(false);
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible({
      ...passwordVisible,
      [field]: !passwordVisible[field],
    });
  };

  return (
    <div className={styles.setContainer}>
      <div className={styles.setHeader}>Settings</div>
      <div className={styles.setMainContainer}>
        <label className={styles.setInputContainer}>
          <img src={nameIcon} alt="name-icon" className={styles.setIcons} />
          <input
            type="text"
            className={styles.input}
            placeholder="Name"
            name="name"
            value={updateData.name}
            onChange={handleChange}
          />
        </label>

        <label className={styles.setInputContainer}>
          <img src={emailIcon} alt="email-icon" className={styles.setIcons} />
          <input
            type="email"
            className={styles.input}
            placeholder=" Update Email"
            name="email"
            value={updateData.email}
            onChange={handleChange}
          />
        </label>
        <p
          className={styles.setErrorMessage}
          id={inputError.email ? styles.error : ""}
        >
          {inputError.email}
        </p>

        <label className={styles.setInputContainer}>
          <img
            src={passwordIcon}
            alt="password-icon"
            className={styles.setIcons}
          />
          <input
            type={passwordVisible.oldPassword ? "text" : "password"}
            className={styles.input}
            placeholder="Old Password"
            name="oldPassword"
            value={updateData.oldPassword}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={passwordVisible.oldPassword ? faEye : faEyeSlash}
            onClick={() => togglePasswordVisibility("oldPassword")}
            className={styles.eye_Icon}
          />
        </label>
        <p
          className={styles.setErrorMessage}
          id={inputError.oldPassword ? styles.error : ""}
        >
          {inputError.oldPassword}
        </p>

        <label className={styles.setInputContainer}>
          <img
            src={passwordIcon}
            alt="password-icon"
            className={styles.setIcons}
          />
          <input
            type={passwordVisible.newPassword ? "text" : "password"}
            className={styles.input}
            placeholder="New Password"
            name="newPassword"
            value={updateData.newPassword}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={passwordVisible.newPassword ? faEye : faEyeSlash}
            onClick={() => togglePasswordVisibility("newPassword")}
            className={styles.eye_Icon}
          />
        </label>

        <button
          className={styles.button}
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
