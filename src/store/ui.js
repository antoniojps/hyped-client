export default {
  namespaced: true,

  state: {
    isNavOpen: false,
  },

  getters: {
    isNavOpen: state => state.isNavOpen,
  },

  mutations: {
    TOGGLE_NAV (state, value) {
      state.isNavOpen = value
    },
  },
}
