import Vue from 'vue'
import Router from 'vue-router'
// 视图路由
import login from '../views/login'
import forget from '../views/forget'
import register from "../views/register";
import index from "../views/index";
import active from "../views/active";
import calendar from "../components/calendar";
import diaryIndex from "../views/diaryIndex";
import memoIndex from "../views/memoIndex";
import projectIndex from "../views/projectIndex";
import newDiary from "../components/newDiary";
//组件
import diary from "../components/diary";
import editDiary from "../components/editDiary";
import searchDiary from "../components/searchDiary";
import project from "../components/project";
import admin from "../views/admin";
// //test
// import drag from "../test/drag";
import store from "../store/store";

Vue.use(Router);

const router = new Router({
  // routes: [
  //   {
  //     path: "/",
  //     redirect: "/index"
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     component: resolve => require(['../views/login'],resolve)
  //   },
  //   {
  //     path: '/forget',
  //     name: 'forget',
  //     component: resolve => require(['../views/forget'],resolve)
  //   },
  //   {
  //     path: '/register',
  //     name: 'register',
  //     component: resolve => require(['../views/register'],resolve)
  //   },
  //   {
  //     path: '/active',
  //     name: 'active',
  //     component: resolve => require(['../views/active'],resolve)
  //   },

  //   {
  //     path: '/index',
  //     name: 'index',
  //     component: resolve => require(['../views/index'],resolve),
  //     redirect: '/calendar',
  //     children: [
  //       {path: '/calendar', name: 'calendar', component: resolve => require(['../components/calendar'],resolve)},
  //       {path: '/diaryIndex', name: 'diaryIndex', component: resolve => require(['../views/diaryIndex'],resolve)},
  //       {path: '/memoIndex', name: 'memoIndex', component: resolve => require(['../views/memoIndex'],resolve)},
  //       {path: '/projectIndex', name: 'projectIndex', component: resolve => require(['../views/projectIndex'],resolve)},
  //       {path: '/newDiary', name: 'newDiary', component: resolve => require(['../components/newDiary'],resolve)},
  //       {path: '/admin', name: 'admin', component: resolve => require(['../views/admin'],resolve)},

  //       {path: '/diary/:id', name: 'diary', component: resolve => require(['../components/diary'],resolve)},
  //       {path: '/editDiary/:id', name: 'editDiary', component: resolve => require(['../components/editDiary'],resolve)},
  //       {path: '/searchDiary/:searchText', name: 'searchDiary', component: resolve => require(['../components/searchDiary'],resolve)},
  //       {path: '/project/:id', name: 'project', component: resolve => require(['../components/project'],resolve)},
  //     ]
  //   },

  //   //test
  //   {
  //     path: '/drag',
  //     name: 'drag',
  //     component: resolve => require(['../test/drag'],resolve)
  //   },


  // ],

  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/active',
      name: 'active',
      component: active
    },

    {
      path: '/index',
      name: 'index',
      component: index,
      redirect: '/calendar',
      children: [
        {path: '/calendar', name: 'calendar', component: calendar},
        {path: '/diaryIndex', name: 'diaryIndex', component: diaryIndex},
        {path: '/memoIndex', name: 'memoIndex', component: memoIndex},
        {path: '/projectIndex', name: 'projectIndex', component: projectIndex},
        {path: '/newDiary', name: 'newDiary', component: newDiary},
        {path: '/admin', name: 'admin', component: admin},

        {path: '/diary/:id', name: 'diary', component: diary},
        {path: '/editDiary/:id', name: 'editDiary', component: editDiary},
        {path: '/searchDiary/:searchText', name: 'searchDiary', component: searchDiary},
        {path: '/project/:id', name: 'project', component: project},
      ]
    },

    //test
    {
      path: '/drag',
      name: 'drag',
      component: resolve => require(['../test/drag'],resolve)
    },


  ],
  mode: 'history'
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

router.beforeEach((to, from, next) => {
  if (store.state.token === '' && to.path === '/calendar') return next('/login');
  next();
});

export default router
