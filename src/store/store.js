import Vue from 'vue'
import Vuex from 'vuex'
import ui from './ui'
import user from './user'
import team from './team'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ui,
    user,
    team,
  },
})
