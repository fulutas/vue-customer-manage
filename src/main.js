
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import vueResource from "vue-resource"

// Components
import About from "./components/About"
import Customers from "./components/Customers"
import AddCustomers from "./components/AddCustomers"
import CustomerDetails from "./components/CustomerDetails"
import EditCustomer from "./components/EditCustomer"


// Plugin run
Vue.use(vueResource)
Vue.use(VueRouter)

// router - path
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Customers },
    { path: '/about', component: About },
    { path: '/add', component: AddCustomers },
    { path: '/customer/:id', component: CustomerDetails },
    { path: '/edit/:id', component: EditCustomer },


  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router, 
  template: `
  <div id="app">
  <nav class="navbar navbar-default">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">vCustomers</a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><router-link to="/">Anasayfa</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><router-link to="/add">Müşteri Ekle</router-link></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</nav>
  <router-view></router-view>
</div>
  `
}).$mount('#app')
