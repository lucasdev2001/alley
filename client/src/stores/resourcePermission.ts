import { ref, computed } from "vue";
import { acceptHMRUpdate, defineStore } from "pinia";

interface ResourcePermission {
  resourceId: string;
  permissionId: string;
}

export const useResourcePermissionStore = defineStore(
  "resourcePermission",
  () => {
    const resourcePermissions = ref<ResourcePermission[]>([]);

    async function createResourcePermission(
      resourceId: string,
      permissionId: string
    ) {
      const response = await fetch(
        "http://localhost:3000/resource-permission",
        {
          body: JSON.stringify({
            resourceId,
            permissionId,
          }),
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resourcePermission = await response.json();
      return resourcePermission;
    }

    async function listResourcePermissions(
      resourceId: string
    ): Promise<ResourcePermission[]> {
      const response = await fetch(
        `http://localhost:3000/resource-permission/${resourceId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resourcePermissions = await response.json();
      return resourcePermissions;
    }

    async function deleteResourcePermission(
      resourceId: string,
      permissionId: string
    ) {
      const response = await fetch(
        `http://localhost:3000/resource-permission/${resourceId}/${permissionId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const resourcePermission = await response.json();
      return resourcePermission;
    }

    return {
      createResourcePermission,
      listResourcePermissions,
      deleteResourcePermission,
      resourcePermissions,
    };
  }
);

//in case you want a hot reload of your stores
/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot));
} */
