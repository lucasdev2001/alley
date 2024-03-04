<script setup lang="ts">
import router from "@/router";
import { usePrivilageStore } from "@/stores/privilage";
import { useResourceStore } from "@/stores/resource";
import { useResourcePermissionStore } from "@/stores/resourcePermission";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const resourcestore = useResourceStore();
const resourcePermissionStore = useResourcePermissionStore();
const privilageStore = usePrivilageStore();
const { name, resources } = storeToRefs(resourcestore);
async function handleCreateResource() {
  await resourcestore.createResource(name.value);
  name.value = "";
  resources.value = await resourcestore.listResources();
}

async function handleDeleteResource(id: string) {
  await resourcestore.deleteResource(id);
  resources.value = await resourcestore.listResources();
}

async function handleHasPrivilage(id: string) {
  let resourcePermissions =
    (await resourcePermissionStore.listResourcePermissions(id)).map(
      (permission) => permission.permissionId
    ) || [];

  const hasPrivilage = await privilageStore.hasPrivilage(resourcePermissions);

  if (hasPrivilage) {
    document.getElementById(id)?.classList.remove("btn-outline");
    document.getElementById(id)?.classList.add("btn-success");
    document.getElementById(id)?.classList.remove("btn-error");
    alert("You have the privilage to access this resource");
  } else {
    document.getElementById(id)?.classList.remove("btn-outline");
    document.getElementById(id)?.classList.add("btn-error");
    document.getElementById(id)?.classList.remove("btn-success");
    alert("You do not have the privilage to access this resource");
  }
}

onMounted(async () => {
  resources.value = await resourcestore.listResources();
});

function pushToResourceDetails(id: string) {
  router.push({
    name: "resource-detail",
    params: { id },
  });
}
</script>
<template>
  <div class="overflow-x-auto">
    <div class="join w-full">
      <input
        class="input input-bordered join-item"
        placeholder="permission name"
        v-model="name"
      />

      <button class="btn join-item" @click="handleCreateResource">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <template v-for="(resource, index) in resources">
          <tr class="hover:bg-base-200">
            <th>{{ index + 1 }}</th>
            <td>{{ resource.name }}</td>
            <td class="flex gap-3">
              <button
                class="btn btn-primary"
                @click="pushToResourceDetails(resource._id)"
              >
                details
              </button>
              <button
                class="btn btn-outline"
                :id="resource._id"
                @click="handleHasPrivilage(resource._id)"
              >
                Check
              </button>
              <button
                class="btn btn-error"
                @click="handleDeleteResource(resource._id)"
              >
                delete
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
