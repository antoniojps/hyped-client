export default {
  namespaced: true,

  state: {
    user: null,
  },

  getters: {
    user: state => state.user,
    userLogedIn: state => !!state.user,
  },

  mutations: {
    UPDATE_USER (state, value) {
      state.user = value
    },
  },
}
