import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainTable",
    component: () => import("@/views/MainTable.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
