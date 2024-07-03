import React, { useEffect, useState } from "react";
import { getTaskById } from "../../Apis/taskAPI";
import { useParams } from "react-router-dom";
import styles from "./ShareTask.module.css";
import appLogo from "../../Assets/Icons/appLogo.png";
import formatTodayDate from "../../Utils/formatDate";

import high from "../../Assets/Icons/High.png";
import moderate from "../../Assets/Icons/Moderate.png";
import low from "../../Assets/Icons/Low.png";
import NotFound from "../NotFound/NotFound";

const ShareTask = () => {
  const { taskId } = useParams();
  const [taskData, setTaskData] = useState();

  const taskDetails = async (taskId) => {
    const response = await getTaskById(taskId);
    setTaskData(response.data);
  };

  const countCheckedItems = () => {
    return taskData?.checklist?.filter((item) => item.checked).length;
  };

  useEffect(() => {
    taskDetails(taskId);
  }, []);

  return taskData ? (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <img src={appLogo} alt="app-logo" />
        <h5>Pro Manage</h5>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsBox}>
          <div className={styles.priorityContainer}>
            {taskData?.priority === "high" ? (
              <img src={high} alt="high" />
            ) : null}
            {taskData?.priority === "moderate" ? (
              <img src={moderate} alt="moderate" />
            ) : null}
            {taskData?.priority === "low" ? <img src={low} alt="low" /> : null}
            <p>{taskData?.priority.toUpperCase()} PRIORITY</p>
          </div>

          <div className={styles.titleContainer}>
            <p>{taskData?.title}</p>
          </div>

          <div className={styles.checklistContainer}>
            <p>
              Checklist ({countCheckedItems()}/{taskData?.checklist.length})
            </p>
            <div className={styles.checklistItems}>
              {taskData?.checklist?.map((item) => (
                <div className={styles.item} key={item.id}>
                  <input
                    type="checkbox"
                    className={styles.checklistCheckbox}
                    value={item?.checked}
                    checked={item.checked}
                    readOnly
                  />

                  <input
                    type="text"
                    className={styles.checklistName}
                    value={item?.name}
                    readOnly
                  />
                </div>
              ))}
            </div>
          </div>

          {taskData?.dueDate ? (
            <div className={styles.footerContainer}>
              <p>Due Date</p>
              <div>
                {formatTodayDate(taskData?.dueDate)
                  .substring(0, 8)
                  .split(" ")
                  .reverse()
                  .join(" ")}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default ShareTask;
