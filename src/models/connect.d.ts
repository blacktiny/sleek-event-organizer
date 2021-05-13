import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import type { AnalyticsModelType } from './analytics';
import type { VendorsModelType } from './vendors';
import type { EventsModelType } from './events';
import type { StateType } from './login';

export { GlobalModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    events?: boolean;
    vendors?: boolean;
    analytics?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  events: EventsModelType;
  vendors: VendorsModelType;
  login: StateType;
  analytics: AnalyticsModelType;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
