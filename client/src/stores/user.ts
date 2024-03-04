import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface User {
  _id: string;
  name: string;
  email: string;
}

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const user = ref<User>();

  async function listUsers() {
    const response = await fetch("http://localhost:3000/user", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const users = await response.json();
    return users;
  }

  async function getUser(id: string) {
    const response = await fetch(`http://localhost:3000/user/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = await response.json();
    return user;
  }

  return {
    users,
    user,
    listUsers,
    getUser,
  };
});

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
} */
