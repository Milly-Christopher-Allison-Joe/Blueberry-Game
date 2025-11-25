import express from "express";
const router = express.Router();

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await createUser(username, password);
      const token = await createToken({ id: user.id });

      res.status(201).json({ token });
    } catch (error) {
      console.error("Registration error:", error);

      res.status(500).json({ message: "Failed to register" });
    }
  }
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await getUserByUsernameAndPassword(username, password);

      if (!user)
        return res
          .status(401)
          .json({ message: "Invalid username or password." });

      const token = await createToken({ id: user.id });

      res.status(200).json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
