// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
// import "bootstrap/dist/css/bootstrap.css";
// import "font-awesome/css/font-awesome.css"
Vue.use(VueRouter);

import store from "./store/store";
import router from './router/router';

//引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

//引入markdown编辑器
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);//全局使用ElementUI


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
