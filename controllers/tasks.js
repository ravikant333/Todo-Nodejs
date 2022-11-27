const Todo = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const todo = await Todo.find({});
    res.status(200).json({ todo });
  } catch (err) {
    res.send({ msg: err });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Todo.findOne({ _id: taskID });
    res.status(200).json({ task });
  } catch (err) {
    res.send({ msg: err });
  }
};

const createTask = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ todo });
  } catch (err) {
    res.send({ msg: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Todo.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ task });
  } catch (err) {
    res.send({ msg: err });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  getTask,
};
