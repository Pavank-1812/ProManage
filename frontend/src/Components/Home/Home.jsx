import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Home.module.css";
import formatTodayDate from "../../Utils/formatDate";
import collapseIcon from "../../Assets/Icons/collapseIcon.png";
import TaskForm from "../Forms/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createNewTask } from "../../Store/Slices/taskSlice";
import { ToastContainer } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";
import Task from "../Task/Task";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { ModalStyles } from "../../Utils/ModalStyles";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [frequency, setFrequency] = useState(() => {
    const storedFrequency = localStorage.getItem("frequency");
    return storedFrequency ? parseInt(storedFrequency) : 7;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("frequency", frequency.toString());
    dispatch(fetchTasks());
  }, [frequency, dispatch]);

  const taskData = useSelector((state) => state?.task?.tasksBySection);

  const date = formatTodayDate(new Date());

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = (newTaskData) => {
    dispatch(createNewTask(newTaskData)).then(() => dispatch(fetchTasks()));
  };

  const [sectionToCollapse, setSectionToCollapse] = useState("");
  const handleCollapseAll = (section) => {
    setSectionToCollapse(section);
  };

  Modal.setAppElement("#root");
  return (
    <div className={styles.home_container}>
      <div className={styles.topBar}>
        <p>Welcome! {localStorage.getItem("name")}</p>
        <p style={{ color: "#707070", fontWeight: "500" }}>{date}</p>
      </div>
      <div className={styles.home_header}>
        <div>Board</div>
        <label className={styles.home_selectContainer}>
          <select
            name="filter"
            id="filter"
            className={styles.home_select}
            value={frequency}
            onChange={(e) => {
              setFrequency(e.target.value);
            }}
          >
            <option value={1}>Today</option>
            <option value={7}>This week</option>
            <option value={30}>This month</option>
          </select>
        </label>
      </div>
      <div className={styles.home_menu}>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <p>Backlog</p>
            <img
              src={collapseIcon}
              alt="collapse-icon"
              className={styles.collapseIcon}
              onClick={() => {
                handleCollapseAll("backlog");
              }}
            />
          </div>
          <div className={styles.tasksContainer}>
            {taskData?.backlog?.map((task) => {
              return (
                <Task
                  key={task?._id}
                  task={task}
                  sectionToCollapse={sectionToCollapse}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.todoTopbar}>
              <p>To do</p>
              <p className={styles.addIcon} onClick={openModal}>
                +
              </p>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={ModalStyles}
              >
                <TaskForm
                  closeModal={closeModal}
                  handleAddTask={handleAddTask}
                />
              </Modal>
            </div>
            <img
              src={collapseIcon}
              alt="collapse-icon"
              className={styles.collapseIcon}
              onClick={() => {
                handleCollapseAll("todo");
              }}
            />
          </div>
          <div className={styles.tasksContainer}>
            {taskData?.todo?.map((task, index) => {
              return (
                <Task
                  key={index}
                  task={task}
                  sectionToCollapse={sectionToCollapse}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <p>In progress</p>
            <img
              src={collapseIcon}
              alt="collapse-icon"
              className={styles.collapseIcon}
              onClick={() => {
                handleCollapseAll("inprogress");
              }}
            />
          </div>
          <div className={styles.tasksContainer}>
            {taskData?.inprogress?.map((task) => {
              return (
                <Task
                  key={task?._id}
                  task={task}
                  sectionToCollapse={sectionToCollapse}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <p>Done</p>
            <img
              src={collapseIcon}
              alt="collapse-icon"
              className={styles.collapseIcon}
              onClick={() => {
                handleCollapseAll("done");
              }}
            />
          </div>
          <div className={styles.tasksContainer}>
            {taskData?.done?.map((task) => {
              return (
                <Task
                  key={task?._id}
                  task={task}
                  sectionToCollapse={sectionToCollapse}
                />
              );
            })}
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar={true} closeButton={false} />
    </div>
  );
};

export default Home;
