import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasks,
  createTask,
  deleteTaskById,
  updateTaskById,
} from "../../Apis/taskAPI";

const initialState = {
  tasksBySection: {
    todo: [],
    backlog: [],
    inprogress: [],
    done: [],
  },
};

export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  const frequency = JSON.parse(localStorage.getItem("frequency"));
  const response = await getTasks(frequency);
  return response;
});

export const createNewTask = createAsyncThunk(
  "createTask",
  async ({ title, priority, checklist, dueDate }) => {
    const response = await createTask({ title, priority, checklist, dueDate });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (taskId) => {
  const response = await deleteTaskById(taskId);
});

export const updateTask = createAsyncThunk(
  "updateTask",
  async ({
    taskId,
    title,
    priority,
    checklist,
    dueDate,
    section,
    itemId,
    itemChecked,
  }) => {
    const response = await updateTaskById({
      taskId,
      title,
      priority,
      checklist,
      dueDate,
      section,
      itemId,
      itemChecked,
    });
    return response;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      if (action.payload) {
        const taskData = action.payload;

        const newState = {
          tasksBySection: {
            todo: [],
            inprogress: [],
            backlog: [],
            done: [],
          },
        };

        taskData.forEach((task) => {
          if (task.section === "todo") {
            newState.tasksBySection.todo.push(task);
          } else if (task.section === "inprogress") {
            newState.tasksBySection.inprogress.push(task);
          } else if (task.section === "backlog") {
            newState.tasksBySection.backlog.push(task);
          } else if (task.section === "done") {
            newState.tasksBySection.done.push(task);
          }
        });

        return newState;
      }
    });

    builder.addCase(createNewTask.fulfilled, (state, action) => {
      if (action.payload) {
        state.tasksBySection.todo.push(action.payload);
      }
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const updatedTask = action.payload;

      const currentSection = state.tasksBySection[updatedTask.section];

      if (currentSection) {
        const index = currentSection.findIndex(
          (task) => task._id === updatedTask._id
        );

        if (index !== -1) {
          state.tasksBySection[updatedTask.section].splice(index, 1);
          state.tasksBySection[updatedTask.section].push(updatedTask);
        }
      }
    });
  },
});

export default taskSlice.reducer;
