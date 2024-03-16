import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Cookies from 'vue-cookies'

const routes = [
  {
    path: '/',
    name: 'main',
    component: LoginView,
    alias: '/login'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/dashboard/home',
        name: 'home',
        component: () => import('../views/subviews/HomeView.vue'),
        alias: '/dashboard/'
      },
      {
        path: '/dashboard/schedule',
        name: 'schedule',

        component: () => import('../views/subviews/ScheduleView.vue')
      },
      {
        path: '/dashboard/dish',
        name: 'dish',

        component: () => import('../views/subviews/DishView.vue')
      },
      {
        path: '/dashboard/invoice',
        name: 'invoice',

        component: () => import('../views/subviews/InvoiceView.vue')
      },
      {
        path: '/dashboard/staff',
        name: 'staff',

        component: () => import('../views/subviews/StaffView.vue'),
        children: [
          {
            path: '/dashboard/staff',
            alias: '/dashboard/staff/employees',
            name: 'employees',
            component: () => import('@/components/subviews/staff/employee/EmployeeComponent.vue')
          },
          {
            path: '/dashboard/staff/positions',
            name: 'positions',
            component: () => import('@/components/subviews/staff/position/PositionComponent.vue')
          },
          {
            path: '/dashboard/staff/accounts',
            name: 'accounts',
            component: () => import('@/components/subviews/staff/account/AccountComponent.vue')
          }
        ]
      },
      {
        path: '/dashboard/customer',
        name: 'customer',

        component: () => import('../views/subviews/CustomerView.vue')
      },
      {
        path: '/dashboard/table',
        name: 'table',

        component: () => import('../views/subviews/TableView.vue')
      },
      {
        path: '/dashboard/profile',
        name: 'profile',

        component: () => import('../views/subviews/ProfileView.vue')
      },
      {
        path: '/dashboard/expense',
        name: 'expense',

        component: () => import('../views/subviews/ExpenseView.vue')
      },
      {
        path: '/dashboard/cart',
        name: 'cart',

        component: () => import('../views/subviews/CartItemsView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active-link'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const accessToken = Cookies.get('accessToken')
    if (!accessToken) {
      next({ name: 'main' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
