import Vue from 'vue' // vue对象
import VueRouter from 'vue-router' // 路由器对象
import Login from '../components/Login.vue' // 登录界面
import Home from '../components/Home.vue' // 主界面
import Students from '../components/Students.vue'
import Teachers from "../components/Teachers"; // 学生列表界面


Vue.use(VueRouter) // vue对象加载路由

const routes = [
    {
        path: '/',
        // component: Login
        // 重定向
        /*
          A 向 B借钱
          B 没钱，C 有钱
          A 向 C 借钱 --> 借到了钱
        */
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        /*
          组件渲染位置：由路由找到组件，然后将组件渲染到父组件的路由占位符位置，
            没有父组件的，将渲染到App.vue的路由占位符位置

        */
        children: [
            {
                path: '/students',
                component: Students
            }, {
                path: '/teachers',
                component: Teachers
            }
        ]
    },

]

const router = new VueRouter({
    routes
})

/*
  给路由器添加拦截规则，只有登录过后才能访问首页等，通过登录状态来进行判断
  给路由器设置beforeEach（请求之前要执行的逻辑）
    to:去往的地址
    from:从哪个地址来的
    next:放行的方法
*/
router.beforeEach(function (to, from, next) {
    // 当跳转登录界面或者/不需要拦截
    if (to.path === "/login" || to.path === "/") {
        // 维持原来的请求不变
        next();
    } else {
        // 当跳转的界面不是登录页面，需要判断登录状态，若未登录，跳转登录页面
        let user = window.sessionStorage.getItem("userInfo");
        if (user) {
            // 存在登录状态放行
            next();
        } else {
            // 不存在登录状态，跳转登录页面
            next("/login");
        }
    }
});

export default router
