import type { Reducer, Effect } from 'umi';

import {
  addNewEvent,
  deleteEvent,
  deleteInvite,
  fetchEventDetail,
  fetchEvents,
  fetchEventInvites,
  inviteEvent,
  updateEvent,
} from '@/services/events';
import { message } from 'antd';

export type StateType = {
  events: object[];
  eventData?: object;
  newEventId?: string;
  isSucceed?: boolean;
};

export type EventsModelType = {
  namespace: string;
  state: StateType;
  effects: {
    addNewEvent: Effect;
    deleteEvent: Effect;
    deleteInvite: Effect;
    fetchEventData: Effect;
    fetchEvents: Effect;
    fetchEventInvites: Effect;
    inviteEvent: Effect;
    updateEvent: Effect;
    updateState: Effect;
  };
  reducers: {
    afterCreateEvent: Reducer<StateType>;
    afterDeleteEvent: Reducer<StateType>;
    afterDeleteInvite: Reducer<StateType>;
    updateEventData: Reducer<StateType>;
    updateEvents: Reducer<StateType>;
    updateEventState: Reducer<StateType>;
  };
};

const Model: EventsModelType = {
  namespace: 'events',

  state: {
    events: [],
    newEventId: '',
    isSucceed: false,
  },

  effects: {
    *addNewEvent({ payload }, { call, put }) {
      const response = yield call(addNewEvent, payload.data);
      // add new event successfully
      if (response?.success) {
        message.success('Successfully add new event');
      }

      yield put({
        type: 'afterCreateEvent',
        payload: {
          newEventId: response?.success ? response?.data?.eventId : ''
        },
      });
    },
    *deleteEvent({ payload }, { call, put }) {
      const response = yield call(deleteEvent, payload.eventId);
      // delete event successfully
      if (response.success) {
        message.success('Successfully delete event');
        yield put({
          type: 'afterDeleteEvent',
          payload: {
            eventId: payload.eventId
          },
        });
      }
    },
    *deleteInvite({ payload }, { call, put }) {
      const response = yield call(deleteInvite, payload);
      const { success = true } = response;
      // delete invite successfully
      if (success) {
        message.success('Successfully deleted invite');

        yield put({
          type: 'afterDeleteInvite',
          payload: {
            inviteId: payload.inviteId
          },
        });
      }
    },
    *fetchEvents({ payload }, { call, put }) {
      const response = yield call(fetchEvents, payload);
      // Fetch events successfully
      if (response.success) {
        yield put({
          type: 'updateEvents',
          payload: response,
        });
      }
    },
    *fetchEventData({ payload }, { call, put }) {
      const response = yield call(fetchEventDetail, payload.eventId);
      const { success = true } = response;
      // Fetch event detail successfully
      if (success) {
        yield put({
          type: 'updateEventData',
          payload: response.data,
        });
      }
    },
    *fetchEventInvites({ payload }, { call, put }) {
      const response = yield call(fetchEventInvites, payload.eventId);
      const { success = true } = response;
      // Fetch event detail successfully
      if (success) {
        yield put({
          type: 'updateEventData',
          payload: { invites: response.data },
        });
      }
    },
    *inviteEvent({ payload }, { call, put }) {
      const response = yield call(inviteEvent, payload);
      // invite vendors successfully
      if (response?.success) {
        message.success('Successfully invited vendors');

        yield put({
          type: 'updateEventState',
          payload: { newEventId: '' },
        });

        // Fetch updated event invites
        const newResponse = yield call(fetchEventInvites, payload.eventId);
        const { success = true } = newResponse;
        // Fetch event detail successfully
        if (success) {
          yield put({
            type: 'updateEventData',
            payload: { invites: newResponse.data },
          });
        }
      } else {
        message.error(response?.error?.body);
      }
    },
    *updateEvent({ payload }, { call, put }) {
      const response = yield call(updateEvent, payload);
      const { success = false } = response;
      // Fetch event detail successfully
      if (success) {
        message.success('Successfully updated.');

        yield put({
          type: 'updateEventData',
          payload: response.data,
        });
      } else {
        message.error('Updated failed.');
      }
    },
    *updateState({ payload }, { put }) {
      yield put({
        type: 'updateEventState',
        payload,
      });
    },
  },

  reducers: {
    afterCreateEvent(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    afterDeleteEvent(state, { payload }) {
      const updatedEvents = state?.events.filter(eventItem => eventItem._id !== payload.eventId);
      return {
        ...state,
        events: updatedEvents,
      };
    },
    afterDeleteInvite(state, { payload }) {
      const updatedInvites = state?.eventData?.invites.filter(inviteItem => inviteItem._id !== payload.inviteId);
      return {
        ...state,
        eventData: {
          ...state?.eventData,
          invites: updatedInvites,
        }
      };
    },
    updateEventData(state, { payload }) {
      return {
        ...state,
        eventData: {
          ...state?.eventData,
          ...payload,
        },
        isSucceed: true,
      };
    },
    updateEvents(state, { payload }) {
      return {
        ...state,
        events: payload.data,
      };
    },
    updateEventState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};

export default Model;
