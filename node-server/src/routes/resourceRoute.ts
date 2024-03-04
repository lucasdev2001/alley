import express from "express";
import { Role, Resource } from "../models";
const router = express.Router();
router.post("/", async (req, res) => {
  const { name } = req.body;

  const exists = await Resource.exists({ name });

  if (exists) {
    return res.status(400).json({ message: "Resource already exists" });
  }

  const resource = new Resource({ name });

  await resource.save();

  res.status(200).json(resource);
});

router.get("/", async (req, res) => {
  const resources = await Resource.find();

  res.status(200).json(resources);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resource.findById(id);
    res.status(200).json(resource);
  } catch (error) {
    res.status(404).json(
      new Resource({
        name: "",
      })
    );
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const resource = await Resource.findByIdAndDelete(id);

  res.status(200).json(resource);
});

export default router;
