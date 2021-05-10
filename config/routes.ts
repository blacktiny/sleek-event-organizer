export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
          {
            name: 'forgotPassword',
            path: '/user/forgot-password',
            component: './User/forgotPassword',
          },
          {
            name: 'confirmForgotPassword',
            path: '/user/forgot-password/confirm',
            component: './User/forgotPassword/Confirm',
          },
          {
            name: 'resetPassword',
            path: '/user/reset-password',
            component: './User/resetPassword',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/home',
              },
              {
                path: '/profile',
                name: 'profile',
                component: './Profile',
                isHide: true,
              },
              {
                path: '/home',
                name: 'home',
                icon: 'home',
                component: './Home',
              },
              {
                path: '/events',
                name: 'events',
                icon: 'calendar',
                component: './Events',
              },
              {
                path: '/events/:id',
                name: 'eventDetails',
                component: './EventDetail',
                isHide: true,
              },
              {
                path: '/vendors',
                name: 'vendors',
                icon: 'shop',
                component: './Vendors',
              },
              {
                path: '/analytics/revenue',
                name: 'revenue_analytics',
                icon: 'barChart',
                component: './Revenue',
              },
              {
                path: '/analytics/space',
                name: 'space_analytics',
                icon: 'videoCamera',
                component: './Space',
              },
              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              // {
              //   name: 'list.table-list',
              //   icon: 'table',
              //   path: '/list',
              //   component: './TableList',
              // },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
