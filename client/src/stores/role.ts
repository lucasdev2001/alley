import { ref, computed, watch } from "vue";
import { acceptHMRUpdate, defineStore, storeToRefs } from "pinia";
import { useUserCacheStore } from "./userCache";

interface Role {
  _id: string;
  companyId: string;
  name: string;
}

const userCacheStore = useUserCacheStore();
const { choosenCompany, userCache } = storeToRefs(userCacheStore);

export const useRoleStore = defineStore("role", () => {
  const name = ref("");
  const roles = ref<Role[]>([]);
  const role = ref<Role>();

  async function createRole(companyId: string, name: string) {
    const response = await fetch("http://localhost:3000/role", {
      body: JSON.stringify({
        companyId: companyId,
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

  async function listRoles(companyId: string) {
    const response = await fetch(`http://localhost:3000/role/${companyId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const roles = await response.json();
    return roles;
  }

  async function getRole(companyId: string, id: string) {
    const response = await fetch(
      `http://localhost:3000/role/${companyId}/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

  watch(
    userCache,
    async () => {
      console.log(choosenCompany.value);

      if (choosenCompany.value === undefined) return;
      else {
        roles.value = await listRoles(choosenCompany.value._id);
      }
    },
    { deep: true }
  );

  return { listRoles, createRole, getRole, deleteRole, name, roles, role };
});

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
} */
