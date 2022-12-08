import App from './Home.vue'
import Vue from 'vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
