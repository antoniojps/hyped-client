import Vue from 'vue'
import Vuex from 'vuex'
import ui from './ui'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ui,
  },
})
