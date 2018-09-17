
export default {
  namespaced: true,

  state: {
    team: null,
  },

  getters: {
    team: state => state.team,
  },

  mutations: {
    UPDATE_TEAM (state, value) {
      state.team = value
    },
  },
}
