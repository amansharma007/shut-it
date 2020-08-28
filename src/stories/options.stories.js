import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../styles/app.scss'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale });
import Settings from '../components/Settings.vue'

export default {
  title: 'Options'
}

export const settings = () => ({
  components: { Settings },
  template: `
    <settings />
  `
})
