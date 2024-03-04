import express from "express";
import { RolePermission } from "../models";
const router = express.Router();

router.post("/", async (req, res) => {
  const { roleId, permissionId } = req.body;

  const exists = await RolePermission.exists({ roleId, permissionId });

  if (exists) {
    return res.status(400).json({ message: "Permission already exists" });
  }

  const rolePermission = new RolePermission({ roleId, permissionId });

  await rolePermission.save();

  console.log(rolePermission);

  res.status(200).json(rolePermission);
});

router.get("/:roleid", async (req, res) => {
  const { roleid } = req.params;
  const rolePermissions = await RolePermission.find({ roleId: roleid });
  res.status(200).json(rolePermissions);
});

router.delete("/:roleid/:permissionid", async (req, res) => {
  const { roleid, permissionid } = req.params;

  const rolePermission = await RolePermission.findOneAndDelete({
    roleId: roleid,
    permissionId: permissionid,
  });

  res.status(200).json(rolePermission);
});

export default router;
