import { defineStore } from "pinia";
import { ref } from "vue";

interface UserCache {
  choosenCompany: {
    name: string;
    _id: string;
  };
}

export const useUserCacheStore = defineStore("userChache", () => {
  const userCache = ref<UserCache>();
  const choosenCompany = ref<UserCache["choosenCompany"]>({
    name: "",
    _id: "",
  });
  async function getUserCache(): Promise<UserCache> {
    const response = await fetch("http://localhost:3000/user-cache", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userCache = await response.json();
    return userCache;
  }

  async function updateUserCache(update: Object): Promise<UserCache> {
    const response = await fetch("http://localhost:3000/user-cache", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });

    const userCache = await response.json();
    return userCache;
  }

  return { userCache, choosenCompany, getUserCache, updateUserCache };
});
