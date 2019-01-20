
const projectA = {
    state: {
        project: false
    },

    actions: {
        changePro({ commit, state }, payload) {
            state.project = payload.project;
        }
    }
}

export default projectA
