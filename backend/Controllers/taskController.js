const Task = require('../Models/Task');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const createTask = async (req, res) => {
    try {
        const { title, priority, checklist, dueDate, userId, assignTo } = req.body;

        if (!title || !priority || !checklist) {
            return res.status(400).json({
                message: "Enter all details!",
                success: false
            });
        }

        const taskData = {
            title,
            section: 'todo',
            priority,
            checklist,
            refUserId: userId,
            assignTo
        };

        if (dueDate) {
            taskData.dueDate = dueDate;
        }

        const newTask = new Task({ ...taskData });
        const response = await newTask.save();

        res.status(200).json({ message: "Task Added!", response });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const { frequency } = req.query;
        const { userId } = req.body;

        let filter = { refUserId: userId };

        if (frequency) {
            filter.createdAt = {
                $gt: moment().subtract(frequency, 'd').toDate()
            };
        }

        const taskData = await Task.find(filter);

        if (taskData) {
            res.status(200).json(taskData);
        } else {
            res.status(404).json({ message: "No tasks found" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        if (!taskId) {
            return res.status(400).json({
                message: "Bad Request",
                success: false
            });
        }

        const taskDetails = await Task.findById(taskId);

        if (taskDetails) {
            res.status(200).json(taskDetails);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

const deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (deletedTask) {
            res.json({ message: 'Task deleted!', deletedTask });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

const updateTaskById = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { title, priority, checklist, dueDate, section, itemId, itemChecked, assignTo } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        if (itemId && itemChecked !== undefined) {
            const checklistItem = task.checklist.find(item => item._id.toString() === itemId);
            if (checklistItem) {
                checklistItem.completed = itemChecked;
            }
        }

        if (section) {
            task.section = section;

            if (section === 'done') {
                task.checklist.forEach(item => {
                    item.completed = true;
                });
            }
        }

        if (title) task.title = title;
        if (priority) task.priority = priority;
        if (checklist) task.checklist = checklist;
        if (dueDate) task.dueDate = dueDate;
        if (assignTo) task.assignTo = assignTo;

        const updatedTask = await task.save();
        res.status(200).json({ message: 'Task Updated!', task: updatedTask });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createTask, getAllTasks, getTaskById, deleteTaskById, updateTaskById };
