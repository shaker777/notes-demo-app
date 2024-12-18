import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import FontAwesomeIcon from "./utilities/fontawesome-icons.ts";

const app = createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(createPinia())
    .use(router)
    .mount('#app')
