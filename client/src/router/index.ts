import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/dashboard/DashboardView.vue"),
      beforeEnter: async (to, from) => {
        const res = await fetch("http://localhost:3000/session", {
          credentials: "include",
        });
        if (!res.ok) {
          return { name: "home" };
        }
      },
      children: [
        {
          path: "roles",
          name: "roles",
          component: () => import("../views/dashboard/RolesView.vue"),
        },
        {
          path: "users",
          name: "users",
          component: () => import("../views/dashboard/UsersView.vue"),
        },
        {
          path: "permissions",
          name: "permissions",
          component: () => import("../views/dashboard/PermissionsView.vue"),
        },
      ],
    },
  ],
});

export default router;
