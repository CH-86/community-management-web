import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import clazz from './modules/clazz'
import college from '@/store/modules/college';
import community from '@/store/modules/community';
import news from '@/store/modules/news';
import activity from '@/store/modules/activity';
import message from '@/store/modules/message';
import statistics from '@/store/modules/statistics';


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    college,
    community,
    clazz,
    activity,
    news,
    statistics,
    message
  },
  getters
});

export default store
