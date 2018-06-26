import Vue from 'vue';
// maybe sometime, for now do it the old fashion way in the html
//import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';


var infoLoader = require('./util/LookupInformationLoader');

import store from './store';  // shorthand for index.js file

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({ routes });

import Banner from './components/Banner.vue';
import SystemErrorAlert from './components/SystemErrorAlert.vue';

import axios from 'axios';
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  data: {},
  router,
  store,
  components: {Banner, SystemErrorAlert},
  created() {
    infoLoader.loadLookupInformation.call(this);
  }
});
