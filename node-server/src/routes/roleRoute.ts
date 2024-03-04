import express from "express";
import { Role } from "../models";
const router = express.Router();
router.post("/", async (req, res) => {
  const { name } = req.body;

  const exists = await Role.exists({ name });

  if (exists) {
    return res.status(400).json({ message: "Role already exists" });
  }

  const role = new Role({ name });

  await role.save();

  res.status(200).json(role);
});

router.get("/", async (req, res) => {
  const roles = await Role.find();

  res.status(200).json(roles);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findById(id);
    res.status(200).json(role);
  } catch (error) {
    res.status(404).json(
      new Role({
        name: "",
      })
    );
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByIdAndDelete(id);

  res.status(200).json(role);
});

export default router;
