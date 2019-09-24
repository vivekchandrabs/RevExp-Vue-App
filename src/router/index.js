import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import Dashboard from "../components/dashboard.vue"
import Logout from "../components/logout.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard/',
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: '/logout/',
      name: "Logout",
      component: Logout
    }

  ]
})
