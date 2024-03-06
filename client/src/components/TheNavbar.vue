<script setup lang="ts">
import router from "@/router";
import { useCompanyStore } from "@/stores/company";
import { useUserCacheStore } from "@/stores/userCache";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted } from "vue";

const companyStore = useCompanyStore();
const { companies } = storeToRefs(companyStore);

const userCacheStore = useUserCacheStore();
const { userCache, choosenCompany } = storeToRefs(userCacheStore);

onMounted(async () => {
  companies.value = await companyStore.listCompanies();
  userCache.value = await userCacheStore.getUserCache();
  if (choosenCompany) {
    choosenCompany.value = userCache.value.choosenCompany;
  }
});

const handleChooseCompany = async (company: Object) => {
  userCacheStore.updateUserCache({ choosenCompany: company });
  userCache.value = await userCacheStore.getUserCache();
  choosenCompany.value = userCache.value.choosenCompany;
};
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
      <div class="dropdown dropdown-end w-80" v-if="companies.length">
        <div tabindex="0" role="button" class="btn btn-primary btn-block m-1">
          <i class="fa-solid fa-truck-medical"></i>
          {{ choosenCompany?.name ?? "Choose Company" }}
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80"
        >
          <template v-for="company in companies">
            <li @click="handleChooseCompany(company)">
              <a>{{ company.name }}</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
