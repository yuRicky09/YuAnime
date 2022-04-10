import smoothscroll from "smoothscroll-polyfill";
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import "./index.css";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// 讓ios兼容Scroll-behavior
smoothscroll.polyfill();

const app = createApp(App);
const pinia = createPinia();
const toastOption = {
  toastClassName: "lg:!w-[640px] lg:!max-w-[640px]",
  position: POSITION.TOP_CENTER,
};

pinia.use(({ store }) => (store.router = markRaw(router)));
app.use(pinia);
app.use(router);
app.use(Toast, toastOption);
app.mount("#app");
