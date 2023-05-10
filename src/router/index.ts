import { createRouter, createWebHashHistory } from 'vue-router'
import basicDemo from './modules/basic-demo'
import type { RouterTypes } from '~/basic'
import Layout from '@/layout/index.vue'

export const constantRoutes: RouterTypes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        // component: () => import('@/views/home/index.vue'),
        //using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Home', elSvgIcon: 'Fold', affix: true }
      }
    ]
  },
  {
    path: '/setting-switch',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/setting-switch/index.vue'),
        name: 'SettingSwitch',
        meta: { title: 'Setting Switch', icon: 'example' }
      }
    ]
  },
  /////////////////////0504 Index Table////////////////////////////
  {
    path: '/index-table',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/index-table/index.vue'),
        name: 'IndexTable',
        meta: { title: 'Index Table', icon: 'example' }
      }
    ]
  }
  /////////////////////////////////////////////////
]

//角色和code数组动态路由
export const roleCodeRoutes: RouterTypes = [
  {
    path: '/error-log',
    component: Layout,
    meta: { title: 'Error Log', icon: 'eye', code: 16, roles: ['ADMIN'] },
    alwaysShow: true,
    children: [
      {
        path: 'error-log',
        component: () => import('@/views/error-log/index.vue'),
        name: 'ErrorLog',
        meta: { title: 'Error Index' }
      },
      {
        path: 'error-generator',
        component: () => import('@/views/error-log/error-generator.vue'),
        name: 'ErrorGenerator',
        meta: { title: 'Error Generator', code: 16 }
      }
    ]
  },
  {
    path: '/roles-codes',
    component: Layout,
    redirect: '/roles-codes/page',
    hidden: true,
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['ADMIN', 'EDITOR'], // you can set roles in root nav
      code: 16
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/roles-codes/index.vue'),
        name: 'RolesCodes',
        meta: { title: 'Permission Switch' }
      },
      {
        path: 'roleIndex',
        component: () => import('@/views/roles-codes/role-index.vue'),
        name: 'RoleIndex',
        meta: { title: 'Role Index', roles: ['ADMIN'] }
      },
      {
        path: 'code-high',
        component: () => import('@/views/roles-codes/code-index.vue'),
        name: 'CodeIndexHigh',
        meta: { title: 'Code High' }
      },
      {
        path: 'code-low',
        component: () => import('@/views/roles-codes/code-index.vue'),
        name: 'CodeIndexLow',
        meta: { title: 'Code Low' }
      },
      {
        path: 'button-permission',
        component: () => import('@/views/roles-codes/button-permission.vue'),
        name: 'ButtonPermission',
        meta: { title: 'Button Permission' }
      }
    ]
  },
  basicDemo,
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested',
      code: 16,
			roles: ['ADMIN']
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index.vue'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes: RouterTypes = [
  // 404 page must be placed at the end !!!
  { path: '/:catchAll(.*)', name: 'CatchAll', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
