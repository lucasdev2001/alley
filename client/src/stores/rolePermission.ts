import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface RolePermission {
  roleId: string;
  permissionId: string;
}

export const useRolePermissionStore = defineStore("rolePermission", () => {
  const rolePermissions = ref<RolePermission[]>([]);

  async function createRolePermission(roleId: string, permissionId: string) {
    const response = await fetch("http://localhost:3000/role-permission", {
      body: JSON.stringify({
        roleId,
        permissionId,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const rolePermission = await response.json();
    return rolePermission;
  }

  async function listRolePermissions(roleId: string) {
    const response = await fetch(
      `http://localhost:3000/role-permission/${roleId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rolePermissions = await response.json();
    return rolePermissions;
  }

  async function deleteRolePermission(roleId: string, permissionId: string) {
    const response = await fetch(
      `http://localhost:3000/role-permission/${roleId}/${permissionId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rolePermission = await response.json();
    return rolePermission;
  }

  return {
    createRolePermission,
    listRolePermissions,
    deleteRolePermission,
    rolePermissions,
  };
});

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
} */
