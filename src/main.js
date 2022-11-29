import Vue from 'vue'
import App from './App.vue'
import element from "@/element"
import router from "@/router"
import '@/permission'
import store from "@/store"

Vue.use(element)
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
