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
    meta: { title: "アニメ | YuAnime" },
  },
  {
    path: "/works/:id",
    name: "WorkDetail",
    component: () => import("@/views/WorkDetail.vue"),
    props: true,
  },
  {
    path: "/search",
    name: "SearchWork",
    component: () => import("@/views/SearchWork.vue"),
    meta: { title: "検索 | YuAnime" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: { title: "NotFound | YuAnime" },
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

router.afterEach((to) => (document.title = to.meta.title));

export default router;
