<script setup lang="ts">
import { usePermissionStore } from "@/stores/permission";
import { useResourceStore } from "@/stores/resource";
import { useResourcePermissionStore } from "@/stores/resourcePermission";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const permissionStore = usePermissionStore();
const resourceStore = useResourceStore();
const resourcePermissionStore = useResourcePermissionStore();

const { resource } = storeToRefs(resourceStore);

const { permissions } = storeToRefs(permissionStore);

const { resourcePermissions } = storeToRefs(resourcePermissionStore);
const id = route.params.id as string;

const resourceHasPermission = (permissionId: string) => {
  return resourcePermissions.value.some(
    (resourcePermission) => resourcePermission.permissionId === permissionId
  );
};

onMounted(async () => {
  resource.value = await resourceStore.getResource(id);
  permissions.value = await permissionStore.listPermissions();
  resourcePermissions.value =
    await resourcePermissionStore.listResourcePermissions(id);
});

async function handleCheckPermission(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    await resourcePermissionStore.createResourcePermission(id, target.id);
    resourcePermissions.value =
      await resourcePermissionStore.listResourcePermissions(id);
    console.log(resourcePermissions.value);
  } else {
    await resourcePermissionStore.deleteResourcePermission(id, target.id);
    resourcePermissions.value =
      await resourcePermissionStore.listResourcePermissions(id);
    console.log(resourcePermissions.value);
  }
}
</script>
<template>
  <h1 class="text-2xl font-serif">The {{ resource?.name }}</h1>
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
                :checked="resourceHasPermission(permission._id)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
