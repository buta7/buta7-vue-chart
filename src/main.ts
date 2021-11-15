import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';

createApp(App).use(router).use(store).use(VueLoaders).mount('#app')
