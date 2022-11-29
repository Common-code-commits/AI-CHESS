import Vue from 'vue'
import App from './App.vue'
import element from "@/element"
import router from "@/router"
import '@/permission'

Vue.use(element)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
