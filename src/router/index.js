import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HomeInspector from '@/components/HomeInspector'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/homeinspector',
      name: 'HomeInspector',
      component: HomeInspector
    }
  ]
})
