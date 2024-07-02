const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checklistItemSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const taskSchema = new Schema({
  title: { type: String, required: true },
  section: { type: String, default: 'todo' },
  priority: { type: String, required: true },
  checklist: [checklistItemSchema],
  dueDate: { type: Date },
  refUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignTo: {
    type: String,  // Assuming this will be an email ID
    required: false  // Optional field
}
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
