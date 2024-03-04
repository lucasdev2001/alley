<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { email, password, confirmPassword } = storeToRefs(authStore);
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
</script>

<template>
  <main class="flex flex-col sm:flex-row h-screen font-sans">
    <aside class="grid justify-center content-evenly sm:basis-1/2 h-full">
      <figure class="flex place-items-center">
        <img src="/logo.svg" alt="logo" class="mx-auto w-52" />
      </figure>
      <hgroup class="text-center">
        <h1 class="text-5xl font-extralight">
          Luca's

          <span class="text-primary"> Plaground </span>
        </h1>
        <h2 class="text-lg">Bem-vindo de volta!</h2>
      </hgroup>

      <Form
        class="form-control gap-2 justify-evenly"
        @submit="() => authStore.login(email, password)"
        data-testid="form"
        id="form"
        :validation-schema="schema"
      >
        <label for="email-input"> Email </label>
        <Field
          type="email"
          data-testid="email-input"
          name="email"
          id="email-input"
          class="input input-bordered input-primary"
          v-model="email"
        />
        <ErrorMessage name="email" class="text-error" />

        <label for="password-input">Password</label>
        <Field
          type="password"
          class="input input-bordered input-primary"
          data-testid="password-input"
          name="password"
          id="password-input"
          v-model="password"
        />
        <ErrorMessage name="password" class="text-error" />

        <button
          class="btn btn-primary"
          type="submit"
          data-testid="submit-button"
        >
          Login
        </button>
      </Form>
      <span>
        Ainda não tem uma conta?
        <a class="link link-primary">cadastrar</a>
      </span>
    </aside>
    <aside class="hidden sm:flex basis-1/2 max-h-screen flex-1">
      <img src="/ee.jpg" alt="login" class="w-full object-cover rounded-md" />
    </aside>
  </main>
</template>
