const request = require("supertest");
const express = require("express");
const app = express(); // Your Express app instance

import taskModel from "../models/taskModel";
// Import your route functions
import { addTask, getTask, removeTask } from "./taskController";

const sampleUserId = "sample-user-id";

// Define a sample task data
const sampleTask = {
  title: "Test Task",
  description: "This is a test task",
};

jest.mock("../models/taskModel.js", () => {
  return {
    default: jest.fn(),
    findByIdAndDelete: jest.fn(() => Promise.resolve({})),
    find: jest.fn(() => Promise.resolve(sampleTask)),
    save: jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: { message: "Task deleted successfully" },
      })
    ),
  };
});

// Define a sample user ID for testing

describe(" API Tests", () => {
  it("should get tasks for a user", (done) => {
    // Mock the request object
    const req = { user: { id: sampleUserId } };
    const res = { status: jest.fn(), json: jest.fn() };
    // taskModel.find.mockResolvedValueOnce(sampleTask);
    res.status.mockReturnValue(res);

    // Call the getTask function
    getTask(req, res).then(() => {
      // Verify the response
      expect(res.status).toHaveBeenCalledWith(200);
      // You can add more assertions to verify the response data
      done();
    });
  });

  // Test removing a task
  it("should remove a task", (done) => {
    // Mock the request object
    const req = { body: { id: "task-id" } };
    const res = { status: jest.fn(), json: jest.fn() };
    res.status.mockReturnValue(res);

    // Call the removeTask function
    removeTask(req, res).then(() => {
      // Verify the response
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task deleted successfully",
      });
      done();
    });
  }, 10000);
});
