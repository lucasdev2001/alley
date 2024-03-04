import express from "express";
import { ResourcePermission } from "../models";
const router = express.Router();

router.post("/", async (req, res) => {
  const { resourceId, permissionId } = req.body;

  const exists = await ResourcePermission.exists({ resourceId, permissionId });

  if (exists) {
    return res.status(400).json({ message: "Resource already exists" });
  }

  const resourcePermission = new ResourcePermission({
    resourceId,
    permissionId,
  });

  await resourcePermission.save();

  console.log(resourcePermission);

  res.status(200).json(resourcePermission);
});

router.get("/:resourceId", async (req, res) => {
  const { resourceId } = req.params;
  const resourcePermissions = await ResourcePermission.find({
    resourceId: resourceId,
  });
  res.status(200).json(resourcePermissions);
});

router.delete("/:resourceId/:permissionId", async (req, res) => {
  const { resourceId, permissionId } = req.params;

  const resourcePermission = await ResourcePermission.findOneAndDelete({
    resourceId: resourceId,
    permissionId: permissionId,
  });

  res.status(200).json(resourcePermission);
});

export default router;
