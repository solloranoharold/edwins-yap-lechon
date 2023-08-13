import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Story from '../views/OurStory'
import Menu from '../views/Menu.vue'
import Cart from '../views/MyCart.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import PriceList from '../views/PriceList.vue'
import MyOrders from '../views/MyOrders.vue'

import About from '../views/About.vue'
//ADMIN
import ShippingFee from '../views/ShippingFees.vue'
import Accounts from '../views/Accounts.vue'
import Reports from '../views/Admin/Reports.vue'
import Sales from '../views/Admin/GenerateSales.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/story',
    name: 'OurStory',
    component: Story
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/price_list',
    name: 'PriceList',
    component: PriceList
  },
   {
    path: '/cart',
    name: 'MyCart',
     component: Cart
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/myoders',
    name: 'MyOrders',
    component: MyOrders
  },
  //ADMIN
  {
    path: '/shipping',
    name: 'ShippingFee',
    component: ShippingFee
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/accounts',
    name: 'About',
    component: Accounts
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/sales/:year/:month',
    name: 'Sales',
    component: Sales
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if ((store.state.userInfo.UserRights !== 1 && store.state.userInfo.UserRights !== 3) && (to.path.substr(0, 8) == '/master/' || to.path.substr(0, 10) == '/analysis/')) {
//     next(from.path)
//   } else {
//     if (to.path !== '/login') {
//       if (store.state.userInfo.isLogin) {
//         next()
//       } else {
//         next('/login')
//         // next()
//       }
//     } else if (to.path === '/login' && store.state.userInfo.isLogin) {
//       next(from.path)
//       // next()
//     } else {
//       next()
//     }
//   }
// })


export default router