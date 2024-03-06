import express from "express";
import { Role, UserRole } from "../models";
const router = express.Router();
router.post("/", async (req, res) => {
  const { name, companyId } = req.body;

  const exists = await Role.exists({ name, companyId });

  if (exists) {
    return res.status(400).json({ message: "Role already exists" });
  }

  const role = new Role({ name, companyId });

  await role.save();

  res.status(200).json(role);
});

router.get("/:companyId", async (req, res) => {
  const { companyId } = req.params;
  const roles = await Role.find({ companyId });

  res.status(200).json(roles);
});

router.get("/:companyId/:id", async (req, res) => {
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

  const userRoles = await UserRole.deleteMany({ roleId: id });

  res.status(200).json([role, userRoles]);
});

export default router;
