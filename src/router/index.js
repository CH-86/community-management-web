import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    permissionValue: 0
  },
  {
    path: '/detail/activity',
    component: () => import('@/views/activity/detail/activity/index'),
    hidden: true,
    permissionValue: 0
  },
  {
    path: '/detail/news',
    component: () => import('@/views/activity/detail/news/index'),
    hidden: true,
    permissionValue: 0

  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    permissionValue: 0
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '大学生社团管理系统'}
    }],
    permissionValue: 0
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: {title: '用户管理', icon: 'el-icon-s-custom'},
    permissionValue: 2,
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/user/index'),
        meta: {title: '用户管理', icon: 'table'},
        permissionValue: 2
      },
      {
        path: 'reset',
        name: 'Reset',
        component: () => import('@/views/user/reset/index'),
        meta: {title: '密码重置', icon: 'el-icon-s-tools'},
        permissionValue: 2
      }
    ]
  },

  {
    path: '/college',
    component: Layout,
    permissionValue: 2,
    children: [
      {
        path: 'index',
        name: 'College',
        component: () => import('@/views/college/index'),
        meta: {title: '学院管理', icon: 'el-icon-user'},
        permissionValue: 2
      }
    ]
  },

  {
    path: '/clazz',
    component: Layout,
    permissionValue: 2,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clazz/index'), // Parent router-view
        name: 'Clazz',
        meta: {
          title: '班级管理',
          icon: 'el-icon-star-off'
        },
        permissionValue: 2
      }
    ]
  },
  {
    path: '/communities',
    component: Layout,
    redirect: '/community/list',
    name: 'Community',
    permissionValue: 1,
    meta: {
      title: '社团管理',
      icon: 'el-icon-office-building'
    },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/community/index'),
        meta: {title: '社团管理', icon: 'el-icon-office-building'},
        permissionValue: 2

      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/community/member/index'),
        meta: {title: '成员管理', icon: 'el-icon-user'},
        permissionValue: 1

      },
      {
        path: 'recruit',
        name: 'Recruit',
        component: () => import('@/views/community/recruit/index'),
        meta: {title: '招新系统', icon: 'el-icon-star-on'},
        permissionValue: 1
      }
    ]
  },
  {
    path: '/notice',
    redirect: '/notice/list',
    name: 'Notice',
    component: Layout,
    meta: {
      title: '公告管理',
      icon: 'el-icon-document-copy'
    },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/notice/index'),
        meta: {title: '公告管理', icon: 'table'},
        permissionValue: 2
      },
      {
        path: 'my-publish',
        name: 'Publish',
        component: () => import('@/views/notice/publish/index'),
        meta: {title: '发布公告', icon: 'el-icon-position'},
        permissionValue: 2
      }
    ],
    permissionValue: 2
  },
  {
    path: '/news',
    redirect: '/news/list',
    name: 'News',
    component: Layout,
    meta: {
      title: '社团风采',
      icon: 'el-icon-magic-stick'
    },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/news/index'),
        meta: {title: '风采管理', icon: 'table'},
        permissionValue: 2
      },
      {
        path: 'my-publish',
        name: 'Publish',
        component: () => import('@/views/news/publish/index'),
        meta: {title: '发布风采', icon: 'el-icon-s-promotion'},
        permissionValue: 1
      }
    ],
    permissionValue: 1,
  },
  {
    path: '/activities',
    name: 'Activities',
    component: Layout,
    meta: {
      title: '活动管理',
      icon: 'el-icon-video-camera-solid'
    },
    permissionValue: 0,
    children: [
      {
        path: 'managerActivity',
        name: 'ManagerActivity',
        component: () => import('@/views/activity/manager-activity/index'),
        meta: {title: '活动管理', icon: 'table'},
        permissionValue: 2,
      },
      {
        path: 'publishActivity',
        name: 'PublishActivity',
        component: () => import('@/views/activity/publish-activity/index'),
        meta: {title: '发布活动', icon: 'el-icon-share'},
        permissionValue: 1
      },
      {
        path: 'myPublish',
        name: 'MyPublish',
        component: () => import('@/views/activity/my-publish/index'),
        meta: {title: '我发起的活动', icon: 'el-icon-suitcase'},
        permissionValue: 1
      },
      {
        path: 'myJoin',
        name: 'MyJoin',
        component: () => import('@/views/activity/my-join/index'),
        meta: {title: '我参加的活动', icon: 'el-icon-sold-out'},
        permissionValue: 0
      }
    ]
  },
  {
    path: '/communityInfo',
    component: Layout,
    permissionValue: 0,
    children: [
      {
        path: 'index',
        name: 'CommunityInfo',
        component: () => import('@/views/community-info/index'),
        meta: {title: '查看社团', icon: 'el-icon-s-help'},
        permissionValue: 2
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true, permissionValue: 0}
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
