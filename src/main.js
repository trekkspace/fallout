import './assets/main.css'
// import contenteditable from 'vue-contenteditable'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Vue.use(contenteditable)
app.use(router)

app.mount('#app')
