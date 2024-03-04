<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const userStore = useUserStore();
const { users } = storeToRefs(userStore);

onMounted(async () => {
  users.value = await userStore.listUsers();
});

function pushToUserDetails(id: string) {
  router.push({
    name: "user-details",
    params: { id },
  });
}
</script>
<template>
  <div class="overflow-x-auto">
    <div class="join w-full"></div>
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <template v-for="(user, index) in users">
          <tr class="hover:bg-base-200" :id="user._id">
            <th>{{ index + 1 }}</th>
            <td>{{ user.email }}</td>
            <td class="flex gap-3">
              <button
                class="btn btn-primary"
                @click="pushToUserDetails(user._id)"
              >
                details
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
