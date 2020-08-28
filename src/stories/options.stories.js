import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../styles/app.scss'

Vue.use(ElementUI);
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
