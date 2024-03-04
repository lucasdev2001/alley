import { ref, computed } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");

  async function login(email: string, password: string) {
    const response = await fetch("http://localhost:3000/session", {
      body: JSON.stringify({ email, password }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.push({ name: "dashboard" });
    } else {
      router.push({ name: "home" });
    }
  }

  return { email, password, confirmPassword, login };
});
