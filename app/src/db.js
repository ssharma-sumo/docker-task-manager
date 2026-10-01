const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set. Add it to the .env file at the project root.');
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Task = mongoose.model('Task', taskSchema);

async function connectDB() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
}

async function createTask({ title, description = '' }) {
  return Task.create({ title, description });
}

async function getAllTasks() {
  return Task.find().sort({ createdAt: -1 });
}

async function deleteTaskById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Task.findByIdAndDelete(id);
}

module.exports = {
  connectDB,
  createTask,
  getAllTasks,
  deleteTaskById,
};
