import { createApp } from "vue";
import App from "./App.vue";

import  router  from "@/router/index";
import { store } from "@/store/store";

import Toast from "vue3-toast-single";
import "vue3-toast-single/dist/toast.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.use(Toast);

app.mount("#app");