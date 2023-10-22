// Import the functions to be tested
import userModel from "../models/userModel";
import { loginUser, registerUser, getUser } from "./userController";
import bcrypt from "bcrypt";
import userController from "./userController";
import jwt from "jsonwebtoken";

jest.mock("../models/userModel");

const mockUser = {
  _id: "mockUserId",
  email: "test@example.com",
  password: "hashedPassword",
};
// Mock UserModel (replace with your actual UserModel import)
jest.mock("../models/userModel", () => {
  return {
    __esModule: true,
    default: {
      findByIdAndDelete: jest.fn(() => Promise.resolve({})),
      findOne: jest.fn(() => Promise.resolve(mockUser)),
      find: jest.fn(() => Promise.resolve([mockUser])),
    },
  };
});

describe("User Authentication and Registration", () => {
  describe("loginUser", () => {
    it("should return a user and token if login is successful", async () => {
      // Mock UserModel.findOne to simulate a successful login

      const req = {
        body: {
          email: "test@example.com",
          password: "password",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      const bcryptCompare = jest
        .spyOn(bcrypt, "compare")
        .mockResolvedValue(true);

      const jwtComp = jest.spyOn(jwt, "sign").mockReturnValue("12344532");

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: mockUser,
        token: expect.any(String),
      });
      bcryptCompare.mockRestore();
      jwtComp.mockRestore();
    });

    it("should return an error if login credentials are invalid", async () => {
      // Mock UserModel.findOne to simulate user not found
      const req = {
        body: {
          email: "nonexistent@example.com",
          password: "invalidPassword",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });
  });

  describe("registerUser", () => {
    it("should return an error if registration fails (e.g., user already exists)", async () => {
      // Mock UserModel.findOne to simulate an existing user
      const req = {
        body: {
          name: "Existing User",
          email: "existinguser@example.com",
          password: "password123",
        },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });
  });

  describe("getUser", () => {
    it("should return user information if user is authenticated", async () => {
      // Mock UserModel.find to simulate a user found
      const id = "mockUserId";
      const user = {
        _id: "mockUserId",
        email: "test@example.com",
        password: "hashedPassword",
      };
      const req = {
        user: { id },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      //userModel.find.mockImplementation(() => Promise.resolve({ user }));
      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user });
    });

    it("should return an error if user information retrieval fails", async () => {
      // Mock UserModel.find to simulate an error
      const id = "mockUserId";
      const req = {
        user: { id },
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      userModel.find.mockImplementation(() => Promise.resolve({ user }));

      // getUser.mockRejectedValue({ user: undefined, status: 200 });

      await getUser(req, res);

      expect(res.status).toHaveBeenCalledWith(502);
      expect(res.json).toHaveBeenCalledWith({ message: "user is not defined" });
    });
  });
});
