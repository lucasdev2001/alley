<script setup lang="ts">
import router from "@/router";
import { useRoleStore } from "@/stores/role";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const roleStore = useRoleStore();
const { name, roles } = storeToRefs(roleStore);
async function handleCreateRole() {
  await roleStore.createRole(name.value);
  name.value = "";
  roles.value = await roleStore.listRoles();
}

async function handleDeleteRole(id: string) {
  await roleStore.deleteRole(id);
  roles.value = await roleStore.listRoles();
}

onMounted(async () => {
  roles.value = await roleStore.listRoles();
});

function pushToRoleDetails(id: string) {
  router.push({
    name: "role-detail",
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

      <button class="btn join-item" @click="handleCreateRole">
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
        <template v-for="(role, index) in roles">
          <tr class="hover:bg-base-200" :id="role._id">
            <th>{{ index + 1 }}</th>
            <td>{{ role.name }}</td>
            <td class="flex gap-3">
              <button
                class="btn btn-primary"
                @click="pushToRoleDetails(role._id)"
              >
                details
              </button>
              <button class="btn btn-error" @click="handleDeleteRole(role._id)">
                delete
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
