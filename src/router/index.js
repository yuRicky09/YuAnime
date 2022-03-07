import { createRouter, createWebHistory } from "vue-router";
import Works from "@/views/Works.vue";

const routes = [
  {
    path: "/",
    redirect: "/works",
  },
  {
    path: "/works",
    name: "Works",
    component: Works,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
