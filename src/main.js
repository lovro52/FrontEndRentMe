import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";
// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVueIcons);
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  BootstrapVue,
  IconsPlugin,
  BootstrapVueIcons,
  render: (h) => h(App),
}).$mount("#app");
