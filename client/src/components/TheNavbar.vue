<script setup lang="ts">
import router from "@/router";
</script>
<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost rounded-btn bg-base-200"
        >
          <i class="fa-solid fa-bars"></i>
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        >
          <li @click="router.push({ name: 'permissions' })">
            <a>Permissions</a>
          </li>
          <li @click="router.push({ name: 'roles' })"><a>Roles</a></li>
          <li @click="router.push({ name: 'users' })"><a>Users</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">{{ router.currentRoute.value.name }}</a>
    </div>
    <div class="navbar-end">
      <button
        class="btn btn-ghost btn-circle"
        @click="router.push({ name: 'dashboard' })"
      >
        <i class="fa-solid fa-house"></i>
      </button>
    </div>
  </div>
</template>
