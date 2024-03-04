import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface UserRole {
  roleId: string;
  userId: string;
}

export const useUserRoleStore = defineStore("userRole", () => {
  const userRoles = ref<UserRole[]>([]);

  async function createUserRole(roleId: string, userId: string) {
    const response = await fetch("http://localhost:3000/user-role", {
      body: JSON.stringify({
        roleId,
        userId,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userRole = await response.json();
    return userRole;
  }

  async function listUserRoles(userId: string) {
    const response = await fetch(`http://localhost:3000/user-role/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userRoles = await response.json();
    return userRoles;
  }

  async function deleteUserRole(roleId: string, userId: string) {
    const response = await fetch(
      `http://localhost:3000/user-role/${roleId}/${userId}`,
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
    userRoles,
    createUserRole,
    listUserRoles,
    deleteUserRole,
  };
});

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
} */
