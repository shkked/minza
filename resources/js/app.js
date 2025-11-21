import "@mdi/font/css/materialdesignicons.css"
import { createPinia } from "pinia"
import { createApp } from "vue"
import { createVuetify } from "vuetify"
import "vuetify/styles"
import "../styles/app.scss"
import App from "./App.vue"
import router from "./router"

const app = createApp(App)
const pinia = createPinia()
const vuetify = createVuetify()

app.use(router).use(pinia).use(vuetify)
app.mount("#app")
