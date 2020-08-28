import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../styles/app.scss'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
