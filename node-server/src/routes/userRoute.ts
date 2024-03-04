import express from "express";
import { User } from "../models";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find({}, { email: 1, name: 1 });
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id, { email: 1, name: 1 });
  res.status(200).json(user);
});

export default router;
