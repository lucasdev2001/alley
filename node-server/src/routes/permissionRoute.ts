import express from "express";
import { Permission } from "../models";
const router = express.Router();

router.post("/", async (req, res) => {
  const { name } = req.body;

  const exists = await Permission.exists({ name });

  if (exists) {
    return res.status(400).json({ message: "Permission already exists" });
  }

  const permission = new Permission({ name });

  await permission.save();

  res.status(200).json({ message: "Permission created" });
});

router.get("/", async (req, res) => {
  const permissions = await Permission.find();

  res.status(200).json(permissions);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findByIdAndDelete(id);

  res.status(200).json(permission);
});

export default router;
