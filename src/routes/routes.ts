import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("../views/BuilderView.vue"),
    },
  ],
  history: createWebHistory(),
});
