export default {
  namespaced: true,

  state: {
    user: null,
  },

  getters: {
    user: state => state.user,
    userLogedIn: state => !!state.user,
    provider: state => state.user.providers[0],
  },

  mutations: {
    UPDATE_USER (state, value) {
      state.user = value
    },
  },
}
