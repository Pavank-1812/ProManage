const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/userMiddleware");
const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} = require("../Controllers/taskController.js");

router.post("/addTask", auth, createTask);
router.get("/getAll", auth, getAllTasks);
router.get("/taskDetails/:taskId", getTaskById);
router.delete("/delete/:taskId", auth, deleteTaskById);
router.put("/update/:taskId", auth, updateTaskById);

module.exports = router;
