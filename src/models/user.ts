import type { Effect, Reducer } from 'umi';

import { queryCurrent, queryUpdate, queryUpload } from '@/services/user';

export type CurrentUser = {
  avatar?: string;
  email?: string;
  name?: string;
  description?: string;
  userid?: string;
  status?: string;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    clear: Effect;
    fetchCurrent: Effect;
    updateProfile: Effect;
    uploadAvatar: Effect;
  };
  reducers: {
    clearUser: Reducer<UserModelState>;
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {
      userid: '',
      name: '',
    },
  },

  effects: {
    *clear(_, { put }) {
      yield put({
        type: 'clearUser',
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent, payload.organizerId);
      if (response.success) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }
    },
    *updateProfile({ payload }, { call, put }) {
      const response = yield call(queryUpdate, payload);
      if (response.success) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      }
    },
    *uploadAvatar({ payload }, { call }) {
      const response = yield call(queryUpload, payload.data);
      console.log('response = ', response);
    },
  },

  reducers: {
    clearUser(state) {
      return {
        ...state,
        currentUser: {},
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: {
          ...action.payload,
          avatar: action.payload?.logoImagePath || '',
        },
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
