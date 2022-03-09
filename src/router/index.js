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
  {
    path: "/works/:id",
    name: "WorkDetail",
    component: () => import("@/views/WorkDetail.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
