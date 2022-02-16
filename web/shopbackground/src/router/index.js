import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from "js-cookie"
import Login from "../view/login.vue"
import Register from "../view/register.vue"
import Admin from "../view/admin.vue"
import Main from "../components/main.vue"
import Users from "../components/users.vue"
import Goods from "../components/goods.vue"
import AddGood from "../components/addgood.vue"
import Category from "../components/category.vue"
import Addcategory from "../components/addcategory.vue"
import Addsku from "../components/addsku.vue"
import Order from "../components/order.vue"

const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:"/register",
      component:Register
    },
    {
      path:"/admin",
      component:Admin,
      children: [
        {
            path: 'Main',
            component:Main,
        },
        {
            path: 'users',
            component:Users,
        },
        {
            path: 'goods',
            component:Goods,
        },
        {
            path: 'addgood',//添加商品路由
            component:AddGood,
        },
        {
            path: 'addgood/:id',//带参数的商品路由
            component:AddGood,
        },
        {
              path:'addSku/:id',
              component:Addsku,
        },
        {
            path: 'category',
            component:Category,
        },
        {
            path: 'addcategory',
            component:Addcategory,
        },
        {
            path: 'addcategory/:id',
            component:Addcategory,
        },
        {
            path:'order',
            component:Order,

        }
      ]
    }

]

const router =createRouter({
    history:createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
 if(to.path === "/login" || to.path === "/register"){
     return next()
 }else{
     const token = Cookies.get("token")
     console.log(token);
     if(!token){
         return next("/register")
     }else{
         return next()
     }
 }
})

export default router
