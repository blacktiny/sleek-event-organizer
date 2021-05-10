// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Volumes/Data/Projects/Sleek/organizer-app/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/Volumes/Data/Projects/Sleek/organizer-app/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Volumes/Data/Projects/Sleek/organizer-app/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "name": "login",
            "path": "/user/login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "forgotPassword",
            "path": "/user/forgot-password",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__forgotPassword' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/User/forgotPassword'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "confirmForgotPassword",
            "path": "/user/forgot-password/confirm",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__forgotPassword__Confirm' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/User/forgotPassword/Confirm'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "resetPassword",
            "path": "/user/reset-password",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__resetPassword' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/User/resetPassword'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Volumes/Data/Projects/Sleek/organizer-app/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Volumes/Data/Projects/Sleek/organizer-app/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/",
                "redirect": "/home",
                "exact": true
              },
              {
                "path": "/profile",
                "name": "profile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Profile' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/Profile'), loading: LoadingComponent}),
                "isHide": true,
                "exact": true
              },
              {
                "path": "/home",
                "name": "home",
                "icon": "home",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Home' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/Home'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/events",
                "name": "events",
                "icon": "calendar",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Events' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/Events'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/events/:id",
                "name": "eventDetails",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__EventDetail' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/EventDetail'), loading: LoadingComponent}),
                "isHide": true,
                "exact": true
              },
              {
                "path": "/vendors",
                "name": "vendors",
                "icon": "shop",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Vendors' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/Vendors'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/analytics/revenue",
                "name": "revenue_analytics",
                "icon": "barChart",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Revenue' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/Revenue'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/analytics/space",
                "name": "space_analytics",
                "icon": "videoCamera",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Space' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/Space'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Volumes/Data/Projects/Sleek/organizer-app/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
