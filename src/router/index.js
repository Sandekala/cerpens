import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CerpenList from '../views/CerpenList.vue';
import ReadCerpen from '../views/ReadCerpen.vue';
import CreateCerpen from '../views/CreateCerpen.vue';
import EditCerpen from '../views/EditCerpen.vue';
import Dashboard from '../views/Dashboard.vue';
import SearchResult from '../views/SearchResult.vue';
import Profil from '../views/Profil.vue';
import currentUser from '../store/init';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      auth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login Page',
      auth: false,
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register Page',
      auth: false,
    },
  },
  {
    path: '/cerpen',
    name: 'CerpenList',
    component: CerpenList,
    meta: {
      title: 'Cerpens',
      auth: false,
    },
  },
  {
    path: '/search',
    name: 'SearchResult',
    component: SearchResult,
    meta: {
      title: 'Cerpens',
      auth: false,
    },
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil,
    meta: {
      title: 'Profil',
      auth: true,
    },
  },
  {
    path: '/cerpen/:cerpenId',
    name: 'Read-Cerpen',
    component: ReadCerpen,
    meta: {
      title: 'Read Cerpen',
      auth: false,
    },
  },
  {
    path: '/create',
    name: 'Create-Cerpen',
    component: CreateCerpen,
    meta: {
      title: 'Create Cerpen',
      auth: true,
    },
  },
  {
    path: '/edit/:cerpenId',
    name: 'Edit-Cerpen',
    component: EditCerpen,
    meta: {
      title: 'Edit Cerpen',
      auth: true,
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Cerpens`;
  next();
});

router.beforeEach(async (to, from, next) => {
  const user = currentUser();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: 'Login' });
  }
  next();
});

export default router;
