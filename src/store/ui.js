export default {
  namespaced: true,

  state: {
    isNavOpen: false,
  },

  getters: {
    isNavOpen: state => state.isNavOpen,
  },

  mutations: {
    navHandler (state, value) {
      state.isNavOpen = value
    },
  },
}
