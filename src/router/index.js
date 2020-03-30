import Vue from 'vue'
import Router from 'vue-router'
import Produto from '@/components/Produto'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Produto',
      component: Produto
    }
  ]
})
