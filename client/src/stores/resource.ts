import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface Resource {
  _id: string;
  name: string;
}

export const useResourceStore = defineStore("resource", () => {
  const name = ref("");
  const resources = ref<Resource[]>([]);
  const resource = ref<Resource>();
  async function createResource(name: string) {
    const response = await fetch("http://localhost:3000/resource", {
      body: JSON.stringify({
        name: name,
      }),
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resource = await response.json();
    return resource;
  }

  async function listResources() {
    const response = await fetch("http://localhost:3000/resource", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resources = await response.json();
    return resources;
  }

  async function getResource(id: string) {
    const response = await fetch(`http://localhost:3000/resource/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resource = await response.json();
    return resource;
  }

  async function deleteResource(id: string) {
    const response = await fetch(`http://localhost:3000/resource/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
  }

  return {
    listResources,
    createResource,
    getResource,
    deleteResource,
    name,
    resources,
    resource,
  };
});

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
} */
