<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { email, password, confirmPassword } = storeToRefs(authStore);
</script>

<template>
  <main class="flex flex-col sm:flex-row h-screen font-serif">
    <aside class="hidden sm:flex basis-1/2 max-h-screen flex-1">
      <img
        src="/banner.jpg"
        alt="login"
        class="w-full object-cover rounded-md"
      />
    </aside>
    <aside class="grid justify-around sm:basis-1/2 h-full">
      <figure>
        <img src="/logo.svg" alt="logo" class="mx-auto w-56" />
      </figure>
      <hgroup class="text-center">
        <h1 class="text-5xl font-extralight">Noite do filme</h1>
        <h2 class="text-lg">Bem-vindo de volta!</h2>
      </hgroup>
      <form
        action="#"
        method="post"
        class="form-control"
        @submit.prevent="authStore.login(email, password)"
        data-testid="form"
        id="form"
      >
        <label for="email-input"> Email </label>
        <input
          type="text"
          data-testid="email-input"
          name="email-input"
          id="email-input"
          class="input input-bordered input-primary"
          v-model="email"
          required
        />
        <label for="password-input">Password</label>
        <input
          type="password"
          class="input input-bordered input-primary"
          data-testid="password-input"
          name="password-input"
          id="password-input"
          v-model="password"
          required
        />
        <br />
        <button
          class="btn btn-primary"
          type="submit"
          data-testid="submit-button"
        >
          Login
        </button>
      </form>
      <span class="self-center">
        Ainda não tem uma conta?
        <a class="link link-primary">cadastrar</a>
      </span>
    </aside>
  </main>
</template>
