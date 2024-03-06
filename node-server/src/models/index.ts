import { Schema, model } from "mongoose";

/* pure collections */

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const PermissionSchema = new Schema({
  name: String,
});

const RoleSchema = new Schema({
  name: String,
  companyId: Schema.Types.ObjectId,
});

const resourceSchema = new Schema({
  name: String,
});

const company = new Schema({
  name: String,
});

const userCache = new Schema({
  userId: Schema.Types.ObjectId,
  choosenCompany: company,
});

/* association collections */

const userRoleSchema = new Schema({
  userId: Schema.Types.ObjectId,
  roleId: Schema.Types.ObjectId,
});

const rolePermissionSchema = new Schema({
  roleId: Schema.Types.ObjectId,
  permissionId: Schema.Types.ObjectId,
});

const resourcePermissionSchema = new Schema({
  resourceId: Schema.Types.ObjectId,
  permissionId: Schema.Types.ObjectId,
});

export const UserRole = model("UserRole", userRoleSchema);

export const RolePermission = model("RolePermission", rolePermissionSchema);

export const Permission = model("Permission", PermissionSchema);

export const User = model("User", UserSchema);

export const Role = model("Role", RoleSchema);

export const Resource = model("Resource", resourceSchema);

export const ResourcePermission = model(
  "ResourcePermission",
  resourcePermissionSchema
);

export const Company = model("Company", company);
export const UserCache = model("UserCache", userCache);
