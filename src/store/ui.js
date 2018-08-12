export default {
  namespaced: true,

  state: {
    isNavOpen: false,
    gatherRedirect: '/',
  },

  getters: {
    isNavOpen: state => state.isNavOpen,
    gatherRedirect: state => state.gatherRedirect,
  },

  mutations: {
    TOGGLE_NAV (state, value) {
      state.isNavOpen = value
    },
    UPDATE_GATHER_REDIRECT (state, value) {
      state.gatherRedirect = value
    },
  },
}
