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
      name: "dashboard-parent",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/dashboard/DashboardParent.vue"),
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
          path: "",
          name: "dashboard",
          component: () => import("../views/dashboard/DashboardHome.vue"),
        },

        {
          path: "resources",
          name: "resources",
          component: () => import("../views/dashboard/ResourceListView.vue"),
        },
        {
          path: "resources/:id",
          name: "resource-detail",
          component: () => import("../views/dashboard/ResourceDetailView.vue"),
        },
        {
          path: "roles",
          name: "roles",
          component: () => import("../views/dashboard/RolesListView.vue"),
        },
        {
          path: "roles/:id",
          name: "role-detail",
          component: () => import("../views/dashboard/RoleDetailView.vue"),
        },
        {
          path: "permissions",
          name: "permissions",
          component: () => import("../views/dashboard/PermissionsView.vue"),
        },

        {
          path: "users",
          name: "users",
          component: () => import("../views/dashboard/UsersListView.vue"),
        },
        {
          path: "users/:id",
          name: "user-details",
          component: () => import("../views/dashboard/UserDetails.vue"),
        },
      ],
    },
  ],
});

export default router;
