import { createApp } from "vue";
import PrimeVue from "primevue/config";
import "./style.css";
import App from "./App.vue";

import "primevue/resources/themes/lara-light-green/theme.css"; // Tema
import "primevue/resources/primevue.min.css"; // Estilos generales
import "primeicons/primeicons.css"; // Iconos

const app = createApp(App);

// Configuración de PrimeVue
app.use(PrimeVue);

app.mount("#app");
