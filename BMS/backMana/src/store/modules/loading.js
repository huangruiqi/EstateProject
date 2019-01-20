
const loading = {
    state: {
        loading: false
    },

    actions: {    
        changeLoad({ commit, state }, payload) {
            state.loading = payload.display;
        }
    }
}

export default loading
