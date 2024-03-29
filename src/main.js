import Vue from 'vue';
import 'normalize.css';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import '@/styles/_main.scss';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
