import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
//var SystemErrorReporting = require('./modules/SystemErrorReporting');
import systemErrors from './modules/SystemErrorReporting';
import auth         from './modules/Authentication';
import lookupInfo   from './modules/LookupInformation';
import userChoices  from './modules/UserChoices';


Vue.use(Vuex);

var errorMsgs = require('../util/errorMessages');


export default new Vuex.Store({
  modules : {
    systemErrors, auth, lookupInfo, userChoices
  }
});
