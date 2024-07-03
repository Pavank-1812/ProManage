const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checklistItemSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    section: { type: String, default: "todo" },
    priority: { type: String, required: true },
    checklist: [checklistItemSchema],
    dueDate: { type: Date, default: null },
    refUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignTo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
