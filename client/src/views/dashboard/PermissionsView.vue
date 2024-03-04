<script setup lang="ts">
import { usePermissionStore } from "@/stores/permission";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const permissionStore = usePermissionStore();
const { name, permissions } = storeToRefs(permissionStore);
async function handleCreatePermission() {
  await permissionStore.createPermission(name.value);
  name.value = "";
  permissions.value = await permissionStore.listPermissions();
}

async function handleDeletePermission(id: string) {
  await permissionStore.deletePermission(id);
  permissions.value = await permissionStore.listPermissions();
}

onMounted(async () => {
  permissions.value = await permissionStore.listPermissions();
});
</script>
<template>
  <div class="overflow-x-auto">
    <div class="join w-full">
      <input
        class="input input-bordered join-item"
        placeholder="permission name"
        v-model="name"
        required
      />

      <button class="btn join-item" @click="handleCreatePermission">
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
        <template v-for="(permission, index) in permissions">
          <tr class="hover:bg-base-200" :id="permission._id">
            <th>{{ index + 1 }}</th>
            <td>{{ permission.name }}</td>
            <td>
              <button
                class="btn btn-primary"
                @click="handleDeletePermission(permission._id)"
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
