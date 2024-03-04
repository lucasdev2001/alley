<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
import router from "@/router";
</script>
<template>
  <TheNavbar />
  <div class="drawer lg:drawer-open">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col h-screen">
      <RouterView />
      <label
        for="drawer"
        class="btn btn-primary drawer-button lg:hidden mt-auto"
      >
        <i class="fa-solid fa-square-caret-up"></i>
      </label>
    </div>
    <div class="drawer-side">
      <label
        for="drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-60 min-h-full text-base-content gap-3">
        <!-- Sidebar content here -->
        <li @click="router.push({ name: 'dashboard' })" class="bg-base-200">
          <a>
            Home
            <i class="fa-solid fa-house ms-auto"></i>
          </a>
        </li>
        <li @click="router.push({ name: 'permissions' })" class="bg-base-200">
          <a>
            Permissions
            <i class="fa-solid fa-lock ms-auto"></i>
          </a>
        </li>
        <li @click="router.push({ name: 'roles' })" class="bg-base-200">
          <a>
            Roles
            <i class="fa-solid fa-id-badge ms-auto text-lg"></i>
          </a>
        </li>
        <li @click="router.push({ name: 'resources' })" class="bg-base-200">
          <a>
            Resources
            <i class="fa-solid fa-id-badge ms-auto text-lg"></i>
          </a>
        </li>
        <li @click="router.push({ name: 'users' })" class="bg-base-200">
          <a>
            Users
            <i class="fa-solid fa-users ms-auto"></i>
          </a>
        </li>
        <li @click="router.push({ name: 'users' })" class="bg-base-200">
          <a>
            Auditor
            <i class="fa-solid fa-feather ms-auto text-lg"></i>
          </a>
        </li>
        <li @click="router.push({ name: 'users' })" class="bg-base-200">
          <a>
            Diplomat
            <i class="fa-solid fa-handshake ms-auto text-lg"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
