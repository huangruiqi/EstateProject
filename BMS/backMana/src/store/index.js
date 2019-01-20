import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import loading from './modules/loading'
import projectA from './modules/project'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    loading,
    projectA
  },
  getters
})

export default store
