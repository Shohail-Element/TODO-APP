import taskModel from "../models/taskModel.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const addTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const newTask = new taskModel({
    title,
    description,
    completed: false,
    userId,
  });
  await newTask
    .save()
    .then(() => {
      return res.status(200).json({ message: "Task added successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};
const removeTask = async (req, res) => {
  const { id } = req.body;
  console.log("id: ", id);
  await taskModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: "Task deleted successfully" }))
    .catch((error) => res.status(501).json({ message: error.message }));
};

const getTask = async (req, res) => {
  await taskModel
    .find({ userId: req.user.id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(501).json({ message: error.message }));
};
export { addTask, getTask, removeTask };
