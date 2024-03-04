import express from "express";
import { RolePermission, UserRole } from "../models";
const router = express.Router();

router.post("/", async (req, res) => {
  const neededPermissions = req.body.permissions as string[];
  const userId = req.session.userId;
  const userRoles = await UserRole.find({ userId }, { roleId: 1, _id: 0 }).then(
    (role) => role.map((role) => role.roleId)
  );

  const rolesPermissions = await RolePermission.find({
    roleId: { $in: userRoles },
    permissionId: { $in: neededPermissions },
  }).then((rolePermissions) =>
    rolePermissions.map((rolePermission) => String(rolePermission.permissionId))
  );

  /* https://stackoverflow.com/questions/53606337/check-if-array-contains-all-elements-of-another-array */
  const hasPermission = neededPermissions.every((permission) =>
    rolesPermissions.includes(permission)
  );

  if (!hasPermission) {
    return res.status(401).json({ hasPermission: "false" });
  } else {
    res.status(200).json({ hasPermission: "true" });
  }
});

export default router;
