import "./assets/styles/main.css";
import "element-tiptap-vue3-fixed/lib/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/routes/routes.ts";
import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(createPinia());

app.mount("#app");
