import Vue from 'vue'
import Router from 'vue-router'
import PageHome from './views/PageHome.vue'
import PageMyTeams from './views/PageMyTeams.vue'
import PageLogin from './views/PageLogin.vue'
import PageGather from './views/PageGather.vue'
import PagePubgNick from './views/PagePubgNick.vue'
import PageProfile from './views/PageProfile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PageHome,
    },
    {
      path: '/login',
      name: 'login',
      component: PageLogin,
    },
    {
      path: '/gather',
      name: 'gather',
      component: PageGather,
    },
    {
      path: '/pubgnick',
      name: 'pubgnick',
      component: PagePubgNick,
    },
    {
      path: '/profile',
      name: 'profile',
      component: PageProfile,
    },
    {
      path: '/myteams',
      name: 'myteams',
      component: PageMyTeams,
    },
  ],
})
