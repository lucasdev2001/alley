import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface Role {
  _id: string;
  name: string;
}

export const useRoleStore = defineStore("role", () => {
  const name = ref("");
  const roles = ref<Role[]>([]);
  const role = ref<Role>();
  async function createRole(name: string) {
    const response = await fetch("http://localhost:3000/role", {
      body: JSON.stringify({
        name: name,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const role = await response.json();
    return role;
  }

  async function listRoles() {
    const response = await fetch("http://localhost:3000/role", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const roles = await response.json();
    return roles;
  }

  async function getRole(id: string) {
    const response = await fetch(`http://localhost:3000/role/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const role = await response.json();
    return role;
  }

  async function deleteRole(id: string) {
    const response = await fetch(`http://localhost:3000/role/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
  }

  return { listRoles, createRole, getRole, deleteRole, name, roles, role };
});

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
} */
