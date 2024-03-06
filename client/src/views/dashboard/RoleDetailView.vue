<script setup lang="ts">
import { usePermissionStore } from "@/stores/permission";
import { useRoleStore } from "@/stores/role";
import { useRolePermissionStore } from "@/stores/rolePermission";
import { useUserCacheStore } from "@/stores/userCache";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const permissionStore = usePermissionStore();
const roleStore = useRoleStore();
const rolePermissionStore = useRolePermissionStore();
const userCacheStore = useUserCacheStore();

const { role } = storeToRefs(roleStore);

const { permissions } = storeToRefs(permissionStore);

const { rolePermissions } = storeToRefs(rolePermissionStore);

const { choosenCompany } = storeToRefs(userCacheStore);

const id = route.params.id as string;

const roleHasPermission = (permissionId: string) => {
  return rolePermissions.value.some(
    (rolePermission) => rolePermission.permissionId === permissionId
  );
};

onBeforeMount(async () => {
  role.value = await roleStore.getRole(choosenCompany.value._id, id);
  permissions.value = await permissionStore.listPermissions();
  rolePermissions.value = await rolePermissionStore.listRolePermissions(id);
});

async function handleCheckPermission(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    await rolePermissionStore.createRolePermission(id, target.id);
    rolePermissions.value = await rolePermissionStore.listRolePermissions(id);
    console.log(rolePermissions.value);
  } else {
    await rolePermissionStore.deleteRolePermission(id, target.id);
    rolePermissions.value = await rolePermissionStore.listRolePermissions(id);
    console.log(rolePermissions.value);
  }
}
</script>
<template>
  <h1 class="text-2xl font-serif">The {{ role?.name }}</h1>
  <h1 class="text-lg font-serif">At {{ choosenCompany.name }}</h1>
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
        <template v-for="(permission, index) in permissions">
          <tr class="hover:bg-base-200">
            <th>{{ index + 1 }}</th>
            <td>{{ permission.name }}</td>
            <td>
              <input
                type="checkbox"
                class="toggle"
                :id="permission._id"
                @change="handleCheckPermission"
                :checked="roleHasPermission(permission._id)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
