import { createApp } from "vue";
import App from "./App.vue";
import { plugin } from "./components/config";
createApp(App).use(plugin).mount("#app");
