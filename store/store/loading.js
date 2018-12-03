import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
      },
    state: {
      // 加载loding
      loading: {
        status: false,
        text: 'zz'
      },
    },
    mutations: {
      // 修改loding状态
      updateLoadingStatus(state, status) {
        state.loading.status = status;
      },
    },
    // actions: {
    //   // 控制loding
    //   startLoding({state, commit},status){
    //     commit('updateLoadingStatus', status)
    //   },
    // }
  });
  
  export default store;