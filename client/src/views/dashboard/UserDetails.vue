<script setup lang="ts">
import { usePermissionStore } from "@/stores/permission";
import { useRoleStore } from "@/stores/role";
import { useRolePermissionStore } from "@/stores/rolePermission";
import { useUserStore } from "@/stores/user";
import { useUserRoleStore } from "@/stores/userRole";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const userStore = useUserStore();
const roleStore = useRoleStore();
const userRoleStore = useUserRoleStore();

const { user } = storeToRefs(userStore);
const { roles } = storeToRefs(roleStore);
const { userRoles } = storeToRefs(userRoleStore);

const userId = route.params.id as string;

onMounted(async () => {
  user.value = await userStore.getUser(userId);
  roles.value = await roleStore.listRoles();
  userRoles.value = await userRoleStore.listUserRoles(userId);
  console.log(userRoles.value);
});

async function handleCheckRole(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    await userRoleStore.createUserRole(target.id, userId);
    userRoles.value = await userRoleStore.listUserRoles(userId);
  } else {
    await userRoleStore.deleteUserRole(target.id, userId);
    userRoles.value = await userRoleStore.listUserRoles(userId);
  }
}

const userHasRole = (roleId: string) => {
  return userRoles.value.some((userRole) => userRole.roleId === roleId);
};
</script>
<template>
  <h1 class="text-2xl font-serif">User: {{ user?.email }}</h1>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Permission</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <template v-for="(role, index) in roles">
          <tr class="hover:bg-base-200">
            <th>{{ index + 1 }}</th>
            <td>{{ role.name }}</td>
            <td>
              <input
                type="checkbox"
                class="toggle"
                :id="role._id"
                @change="handleCheckRole"
                :checked="userHasRole(role._id)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
