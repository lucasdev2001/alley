import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface permission {
  _id: string;
  name: string;
}

export const usePermissionStore = defineStore("permission", () => {
  const name = ref("");
  const permissions = ref<permission[]>([]);
  async function createPermission(name: string) {
    const response = await fetch("http://localhost:3000/permission", {
      body: JSON.stringify({
        name: name,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
  }

  async function listPermissions() {
    const response = await fetch("http://localhost:3000/permission", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const permissions = await response.json();
    return permissions;
  }

  async function deletePermission(id: string) {
    const response = await fetch(`http://localhost:3000/permission/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
  }

  return {
    createPermission,
    listPermissions,
    deletePermission,
    name,
    permissions,
  };
});

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acce1ptHMRUpdate(usePermissionStore, import.meta.hot));
} */
