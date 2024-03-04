import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePrivilageStore = defineStore("privilage", () => {
  async function hasPrivilage(permissions: string[]): Promise<boolean> {
    const response = await fetch("http://localhost:3000/privilage", {
      body: JSON.stringify({ permissions }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  }

  return { hasPrivilage };
});
