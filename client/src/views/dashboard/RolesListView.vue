<script setup lang="ts">
import router from "@/router";
import { useRoleStore } from "@/stores/role";
import { useUserCacheStore } from "@/stores/userCache";
import { storeToRefs } from "pinia";

const roleStore = useRoleStore();
const userCacheStore = useUserCacheStore();
const { choosenCompany } = storeToRefs(userCacheStore);
const { name, roles } = storeToRefs(roleStore);
async function handleCreateRole() {
  await roleStore.createRole(choosenCompany.value._id, name.value);
  name.value = "";
  roles.value = await roleStore.listRoles(choosenCompany.value._id);
}

async function handleDeleteRole(id: string) {
  await roleStore.deleteRole(id);
  roles.value = await roleStore.listRoles(choosenCompany.value._id);
}

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
        placeholder="role name"
        v-model="name"
      />

      <button class="btn join-item" @click="handleCreateRole">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
    <h1 class="text-2xl font-serif mt-3">
      At {{ choosenCompany?.name ?? "" }}
    </h1>
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
