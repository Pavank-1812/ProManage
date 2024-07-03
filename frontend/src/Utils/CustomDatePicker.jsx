import React, { useState } from "react";
import styles from "./CustomDatePicker.module.css";

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className={styles.datePickerContainer}>
      <label className={styles.label} htmlFor="dateInput">
        Select Due Date
      </label>
      <div
        className={styles.dateDisplay}
        onClick={() => document.getElementById("dateInput").click()}
      >
        {selectedDate || "Select Due Date"}
      </div>
      <input
        id="dateInput"
        className={styles.dateInput}
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default CustomDatePicker;
