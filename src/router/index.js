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
        alias: '/dashboard',
        meta: { requiresAdmin: true }
      },
      {
        path: '/dashboard/dish',
        name: 'dish',

        component: () => import('../views/subviews/DishView.vue')
      },
      {
        path: '/dashboard/table',
        name: 'table',

        component: () => import('../views/subviews/TableView.vue')
      },
      {
        path: '/dashboard/invoice',
        name: 'invoice',

        component: () => import('../views/subviews/InvoiceView.vue')
      },
      {
        path: '/dashboard/invoice/:invoiceId/detail',
        name: 'invoiceDetail',

        component: () => import('../views/subviews/InvoiceDetailView.vue')
      },
      {
        path: '/dashboard/staff',
        name: 'staff',
        component: () => import('../views/subviews/StaffView.vue'),
        meta: { requiresAdmin: true },
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
        path: '/dashboard/table/:tableId/order',
        name: 'order',

        component: () => import('../views/subviews/OrderView.vue')
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

import { useUserStore } from '../stores/userStore'

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const requireLogin = to.matched.some((record) => record.meta.requiresAuth)
  const requireAdmin = to.matched.some((record) => record.meta.requiresAdmin)

  // if (to.name === 'main' && Cookies.get('accessToken')) {
  //   const isAdmin = await userStore.isAdmin()
  //   if (isAdmin) {
  //     next({ name: 'home' })
  //   } else {
  //     next({ name: 'dish' })
  //   }

  //   return
  // }

  if (requireLogin) {
    const accessToken = Cookies.get('accessToken')
    if (!accessToken) {
      next({ name: 'main' })
    } else {
      // If authenticated, check if admin access is required
      if (requireAdmin) {
        // If admin access is required, check if user is admin
        const isAdmin = await userStore.isAdmin()

        // If user is admin, allow access
        if (isAdmin) {
          next()
        } else {
          // If not admin, redirect to error view
          next({ name: 'NotFound' })
        }
      } else {
        // If admin access is not required, allow access
        next()
      }
    }
  } else {
    next()
  }
})

export default router
