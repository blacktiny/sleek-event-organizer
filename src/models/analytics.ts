import type { Effect, Reducer } from 'umi';

import { fetchHomeAnalytics, fetchRevenueVendorAnalytics, fetchRevenueEventAnalytics } from '@/services/analytics';

export type AnalyticsModelState = {
  home: any;
  revenue: any;
};

export type AnalyticsModelType = {
  namespace: 'analytics';
  state: AnalyticsModelState;
  effects: {
    fetchHomeAnalytics: Effect;
    fetchRevenueVendorAnalytics: Effect;
    fetchRevenueEventAnalytics: Effect;
  };
  reducers: {
    updateAnalyticsData: Reducer<AnalyticsModelState>;
  };
};

const AnalyticsModel: AnalyticsModelType = {
  namespace: 'analytics',

  state: {
    home: null,
    revenue: null
  },

  effects: {
    *fetchHomeAnalytics({ payload }, { call, put }) {
      const response = yield call(fetchHomeAnalytics, payload.organizerId);
      if (response.success) {
        yield put({
          type: 'updateAnalyticsData',
          payload: { home: response.data },
        });
      }
    },
    *fetchRevenueVendorAnalytics({ payload }, { call, put }) {
      const response = yield call(fetchRevenueVendorAnalytics, payload);
      if (response.success) {
        yield put({
          type: 'updateAnalyticsData',
          payload: { revenue: response.data },
        });
      }
    },
    *fetchRevenueEventAnalytics({ payload }, { call, put }) {
      const response = yield call(fetchRevenueEventAnalytics, payload);
      if (response.success) {
        yield put({
          type: 'updateAnalyticsData',
          payload: { revenue: response.data },
        });
      }
    },
  },

  reducers: {
    updateAnalyticsData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default AnalyticsModel;
