import Vue from 'vue'
import VueRouter from 'vue-router'
import Fib from '@/components/Fib'
import OtherPage from '@/components/OtherPage'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Fib },
  { path: '/otherpage', component: OtherPage }
]

export default new VueRouter({
  mode: 'history',
  routes
})
