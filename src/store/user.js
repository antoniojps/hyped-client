import { logout } from '@/utils/requests'

export default {
  namespaced: true,

  state: {
    user: null,
  },

  getters: {
    user: state => state.user,
    userLogedIn: state => !!state.user,
    provider: state => {
      if (state.user) return state.user.providers[0]
      return null
    },
  },

  mutations: {
    UPDATE_USER (state, value) {
      state.user = value
    },
  },

  actions: {
    async logoutUser ({ commit }) {
      await logout()
      commit('UPDATE_USER', null)
    },
  },
}
