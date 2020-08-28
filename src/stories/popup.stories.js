import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../styles/app.scss'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });
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
