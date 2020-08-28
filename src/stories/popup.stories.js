import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../styles/app.scss'

Vue.use(ElementUI);
import BaseLayout from '../components/BaseLayout.vue'

export default {
  title: 'Popup'
}

export const baseLayout = () => ({
  components: { BaseLayout },
  template: `
    <base-layout></base-layout>
  `
})
