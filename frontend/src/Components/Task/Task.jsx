import React, { useEffect, useState } from "react";
import styles from "./Task.module.css";
import high from "../../Assets/Icons/High.png";
import moderate from "../../Assets/Icons/Moderate.png";
import low from "../../Assets/Icons/Low.png";
import expandCollapse from "../../Assets/Icons/dropdown.png";
import Modal from "react-modal";
import formatTodayDate from "../../Utils/formatDate";
import { useDispatch } from "react-redux";
import {
  fetchTasks,
  deleteTask,
  updateTask,
} from "../../Store/Slices/taskSlice";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import DeleteTaskModal from "../Modal/DeleteTaskModal";
import UpdateForm from "../Forms/UpdateForm";
import { toastStyles } from "../../Utils/toastStyles";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://promanage-234k.onrender.com";
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFFFFF",
    borderRadius: "1rem",
    width: "43vw",
    height: "53vh",
    padding: "2vh 0",
  },
  overlay: {
    backgroundColor: "#303D438C",
  },
};

const Task = ({ task, sectionToCollapse }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionList = ["todo", "inprogress", "backlog", "done"];
  const dispatch = useDispatch();

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId)).then(() => {
      dispatch(fetchTasks());
      closeDeleteModal();
    });
  };

  const handleShare = (taskId) => {
    const taskDetailsLink = `${backendUrl}/task/taskDetails/${taskId}`;

    navigator.clipboard
      .writeText(taskDetailsLink)
      .then(() => {
        toast("Link Copied", { style: toastStyles });
      })
      .catch((error) => {
        console.error("Error copying link to clipboard:", error);
      });
  };

  const handleMoveTask = (taskId, section) => {
    dispatch(updateTask({ taskId, section })).then(() => {
      dispatch(fetchTasks());
    });
  };

  const handleSelectSection = (section) => {
    switch (section) {
      case "todo":
        return "TO-DO";
      case "inprogress":
        return "PROGRESS";
      case "backlog":
        return "BACKLOG";
      case "done":
        return "DONE";
      default:
        break;
    }
  };

  const handleDueDateStyle = (task) => {
    if (task?.section === "done") {
      return {
        backgroundColor: "#63C05B",
        border: "none",
      };
    }

    const currentDate = new Date();
    const dueDate = new Date(task?.dueDate);
    currentDate.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate > currentDate) {
      return {};
    } else if (dueDate.getTime() === currentDate.getTime()) {
      return {};
    } else {
      return {
        backgroundColor: "#CF3636",
        color: "white",
        border: "none",
      };
    }
  };

  const handleCheckboxChange = (checkData) => {
    const { taskId, itemId, itemChecked } = checkData;
    dispatch(updateTask({ taskId, itemId, itemChecked }))
      .then(() => {
        dispatch(fetchTasks());
      })
      .catch((err) => {
        console.log("Task fetching failed : ", err);
      });
  };

  const [collapsedSections, setCollapsedSections] = useState(() => {
    const initialCollapsedState = {};
    sectionList.forEach((section) => {
      initialCollapsedState[section] = true;
    });
    return initialCollapsedState;
  });

  const handleExpandCollapse = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    setCollapsedSections((prev) => {
      const updatedState = { ...prev };
      if (sectionToCollapse === task.section) {
        updatedState[task.section] = true;
      }
      return updatedState;
    });
  }, [sectionToCollapse, task.section]);

  let totalChecklists = 0;
  let checkedItems = 0;
  task?.checklist?.forEach((item) => {
    totalChecklists++;
    if (item.completed) {
      checkedItems++;
    }
  });

  return (
    <div key={task._id} className={styles.taskBox}>
      <div className={styles.priorityBar}>
        <div className={styles.priorityBox}>
          {task?.priority === "high" ? <img src={high} alt="high" /> : null}
          {task?.priority === "moderate" ? (
            <img src={moderate} alt="moderate" />
          ) : null}
          {task?.priority === "low" ? <img src={low} alt="low" /> : null}
          <p>{task?.priority?.toUpperCase()} PRIORITY</p>
        </div>
        <Menu
          menuButton={<button className={styles.displayMenuButton}>•••</button>}
          transition
          menuClassName={styles.menuPopUp}
        >
          <MenuItem onClick={openModal}>Edit</MenuItem>
          <MenuItem onClick={() => handleShare(task?._id)}>Share</MenuItem>
          <MenuItem className={styles.delete} onClick={openDeleteModal}>
            Delete
          </MenuItem>
        </Menu>
      </div>

      <div className={styles.titleBar}>
        <p data-tooltip-id="my-tooltip" data-tooltip-content={task?.title}>
          {task?.title}
        </p>
        <Tooltip id="my-tooltip" />
      </div>

      <div className={styles.checklistBox}>
        <div className={styles.checklistTopbar}>
          <span>{`Checklist (${checkedItems}/${totalChecklists})`}</span>
          <div
            className={styles.expandCollapse}
            onClick={() => handleExpandCollapse(task?.section)}
          >
            <img src={expandCollapse} alt="expandCollapse" />
          </div>
        </div>
        {!collapsedSections[task.section] && (
          <div className={styles.checklistContent}>
            {task?.checklist?.map((item) => (
              <div key={item._id} className={styles.checklistItem}>
                <input
                  type="checkbox"
                  name="checked"
                  checked={item?.completed}
                  className={
                    item?.completed ? styles.checkedBox : styles.uncheckedBox
                  }
                  onChange={(e) => {
                    const checkData = {
                      taskId: task?._id,
                      itemId: item._id,
                      itemChecked: !item?.completed,
                    };
                    handleCheckboxChange(checkData);
                  }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.checklistFooter}>
        <div className={styles.dueDateContainer}>
          {task.dueDate ? (
            <div
              key="dueDate"
              style={handleDueDateStyle(task)}
              className={styles.dueDateButton}
            >
              {formatTodayDate(task?.dueDate)
                .substring(0, 8)
                .split(" ")
                .reverse()
                .join(" ")}
            </div>
          ) : null}
        </div>

        <div className={styles.sectionContainer}>
          {sectionList.map((section, index) => {
            if (section !== task.section) {
              return (
                <div
                  key={index}
                  onClick={() => handleMoveTask(task._id, section)}
                  className={styles.sectionButton}
                >
                  {handleSelectSection(section)}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <UpdateForm closeModal={closeModal} task={task} />
      </Modal>
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
        taskId={task._id}
      />
    </div>
  );
};

export default Task;
