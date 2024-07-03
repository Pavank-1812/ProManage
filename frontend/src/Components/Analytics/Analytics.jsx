import React, { useEffect } from "react";
import styles from "./Analytics.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../Store/Slices/taskSlice";

const Analytics = () => {
  const dispatch = useDispatch();

  const appData = useSelector((state) => state.task.tasksBySection);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const sectionAnalytics = {
    backlogTasks:
      appData.backlog.length >= 0 && appData.backlog.length <= 9
        ? `0${appData.backlog.length}`
        : `${appData.backlog.length}`,
    todoTasks:
      appData.todo.length >= 0 && appData.todo.length <= 9
        ? `0${appData.todo.length}`
        : `${appData.todo.length}`,
    inprogressTasks:
      appData.inprogress.length >= 0 && appData.inprogress.length <= 9
        ? `0${appData.inprogress.length}`
        : `${appData.inprogress.length}`,
    doneTasks:
      appData.done.length >= 0 && appData.done.length <= 9
        ? `0${appData.done.length}`
        : `${appData.done.length}`,
  };

  const taskAnalytics = {
    lowPriority: 0,
    moderatePriority: 0,
    highPriority: 0,
    dueDateTasks: 0,
  };

  const tasksArray = [
    ...appData.backlog,
    ...appData.todo,
    ...appData.inprogress,
    ...appData.done,
  ];

  tasksArray.map((task) => {
    switch (task.priority) {
      case "low":
        taskAnalytics.lowPriority++;
        break;
      case "moderate":
        taskAnalytics.moderatePriority++;
        break;
      case "high":
        taskAnalytics.highPriority++;
        break;
      default:
        break;
    }
  });

  tasksArray.map((task) => {
    if (new Date(task.dueDate) < new Date()) {
      taskAnalytics.dueDateTasks++;
    }
  });

  return (
    <div className={styles.analytics_container}>
      <div className={styles.analytics_header}>Analytics</div>
      <div className={styles.analytics_box}>
        <ul className={styles.analytics_taskList}>
          <li className={styles.analytics_list}>
            <div className={styles.analytics_taskListItem}>
              <p>Backlog Tasks</p>
              <p>{sectionAnalytics.backlogTasks}</p>
            </div>
          </li>
          <li>
            <div className={styles.analytics_taskListItem}>
              <p>To-do Tasks</p>
              <p>{sectionAnalytics.todoTasks}</p>
            </div>
          </li>
          <li>
            <div className={styles.analytics_taskListItem}>
              <p>In-Progress Tasks</p>
              <p>{sectionAnalytics.inprogressTasks}</p>
            </div>
          </li>
          <li>
            <div className={styles.analytics_taskListItem}>
              <p>Completed Tasks</p>
              <p>{sectionAnalytics.doneTasks}</p>
            </div>
          </li>
        </ul>

        <ul className={styles.analytics_taskList}>
          <li>
            <div className={styles.analytics_taskListItem}>
              <p>Low Priority</p>
              <p>
                {taskAnalytics.lowPriority <= 9
                  ? `0${taskAnalytics.lowPriority}`
                  : taskAnalytics.lowPriority}
              </p>
            </div>
          </li>
          <li>
            <div className={styles.analytics_taskListItem}>
              <p>Moderate Priority</p>
              <p>
                {taskAnalytics.moderatePriority <= 9
                  ? `0${taskAnalytics.moderatePriority}`
                  : taskAnalytics.moderatePriority}
              </p>
            </div>
          </li>
          <li>
            <div className={styles.analytics_taskListItem}>
              <p>High Priority</p>
              <p>
                {taskAnalytics.highPriority <= 9
                  ? `0${taskAnalytics.highPriority}`
                  : taskAnalytics.highPriority}
              </p>
            </div>
          </li>
          <li>
            <div className={styles.analytics_taskListItem}>
              <p>Due Date tasks</p>
              <p>
                {taskAnalytics.dueDateTasks <= 9
                  ? `0${taskAnalytics.dueDateTasks}`
                  : taskAnalytics.dueDateTasks}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
