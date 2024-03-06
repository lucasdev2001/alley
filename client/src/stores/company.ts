import { ref, computed } from "vue";
import { defineStore } from "pinia";

interface Company {
  name: string;
}

export const useCompanyStore = defineStore("company", () => {
  const companies = ref<Company[]>([]);

  async function listCompanies(): Promise<Company[]> {
    const response = await fetch("http://localhost:3000/company", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const companies = await response.json();
    return companies;
  }

  return { companies, listCompanies };
});
