import { stringify } from 'querystring';
import type { Effect, Reducer } from 'umi';
import { history } from 'umi';

import { accountLogin, changePasswordQuery } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

export type StateType = {
  email: string;
  password: string;
  result: boolean;
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
    changePassword: Effect;
  };
  reducers: {
    clearLogin: Reducer<StateType>;
    updateState: Reducer<StateType>;
    changePassword: Reducer<StateType>;
    saveLoginCredentials: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    email: '',
    password: '',
    result: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);
      // Login successfully
      if (response.success) {
        yield put({
          type: 'saveLoginCredentials',
          payload,
        });

        if (response.data && response.data.authInfo) {
          const { userId } = response.data;
          const { accessToken = '', refreshToken = '', organizerId = '' } = response.data.authInfo;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          localStorage.setItem('organizer_id', organizerId);
          localStorage.setItem('user_id', userId);
        }
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  successfully signed in！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      } else {
        message.error('Invalid Credentials!');
      }
    },

    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        localStorage.setItem('organizer_id', '');
        localStorage.setItem('user_id', '');
        localStorage.setItem('refresh_token', '');
        localStorage.setItem('access_token', '');

        yield put({
          type: 'clearLogin',
        });

        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },

    *changePassword({ payload }, { call, put }) {
      const response = yield call(changePasswordQuery, payload);
      if (response.success) {
        yield put({
          type: 'changePassword',
          payload: { password: payload.password },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { result: false },
        });
      }
    },
  },

  reducers: {
    clearLogin(state) {
      return {
        ...state,
        email: '',
        password: '',
        result: false,
      };
    },
    saveLoginCredentials(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changePassword(state, { payload }) {
      return {
        ...state,
        ...payload,
        result: true,
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
