import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";
import App from './App.vue'
import router from './router'

// import './assets/main.css'
import {permission} from './directives/index';
const pinia=createPinia();
pinia.use(piniaPluginPersist);
const app = createApp(App)
app.directive('permission', permission);
app.use(pinia)
app.use(router)
app.mount('#app')
