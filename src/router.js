import Vue from 'vue'
import Router from 'vue-router'
import PageHome from './views/PageHome.vue'
import PageMyTeams from './views/PageMyTeams.vue'
import PageLogin from './views/PageLogin.vue'
import PageGather from './views/PageGather.vue'

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
      path: '/myteams',
      name: 'MyTeams',
      component: PageMyTeams,
    },
    {
      path: '/gather',
      name: 'Gather',
      component: PageGather,
    },
  ],
})
