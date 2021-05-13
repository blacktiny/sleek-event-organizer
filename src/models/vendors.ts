import type { Reducer, Effect } from 'umi';

import { fetchVendors, inviteVendor } from '@/services/vendors';
import { message } from 'antd';
import { getOrganizerId } from '@/utils/helper';

export type VendorsType = {
  vendors: object;
};

export type VendorsModelType = {
  namespace: string;
  state: VendorsType;
  effects: {
    // fetchVendorData: Effect;
    fetchVendors: Effect;
    inviteVendor: Effect;
  };
  reducers: {
    // updateEventData: Reducer<VendorsType>;
    updateVendors: Reducer<VendorsType>;
  };
};

const Model: VendorsModelType = {
  namespace: 'vendors',

  state: {
    vendors: [],
  },

  effects: {
    *fetchVendors({ payload }, { call, put }) {
      const response = yield call(fetchVendors, payload);
      // Fetch vendors successfully
      if (response?.success) {
        yield put({
          type: 'updateVendors',
          payload: response,
        });
      } else {
        message.error(response?.error?.body);
      }
    },
    *inviteVendor({ payload }, { call }) {
      const response = yield call(inviteVendor, payload);
      if (response?.success) {
        // handle after invite new vendor successfully
        message.success('Invited successfully.');
      } else {
        message.error(response?.error?.body);
      }
    },
  },

  reducers: {
    updateVendors(state, { payload }) {
      const organizerId = getOrganizerId();
      return {
        ...state,
        vendors: organizerId
          ? payload.data.filter((vendor: any) => vendor.visibleToOrganizerIds.includes(organizerId))
          : payload.data,
      };
    },
  },
};

export default Model;
