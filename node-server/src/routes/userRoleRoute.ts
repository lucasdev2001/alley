import express from "express";
import { UserRole } from "../models";
const router = express.Router();
router.post("/", async (req, res) => {
  const { roleId, userId } = req.body;

  const exists = await UserRole.exists({ roleId, userId });

  if (exists) {
    return res.status(400).json({ message: "Permission already exists" });
  }

  const userRole = new UserRole({ roleId, userId });

  await userRole.save();

  res.status(200).json(userRole);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const userRoles = await UserRole.find({ userId: userId });
  console.log(userRoles);

  res.status(200).json(userRoles);
});

router.delete("/:roleId/:userId", async (req, res) => {
  const { roleId, userId } = req.params;

  const userRole = await UserRole.findOneAndDelete({
    roleId: roleId,
    userId: userId,
  });

  res.status(200).json(userRole);
});

export default router;
