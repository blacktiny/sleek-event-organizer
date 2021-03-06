// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Volumes/Data/Projects/Sleek/organizer-app/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelAnalytics0 from '/Volumes/Data/Projects/Sleek/organizer-app/src/models/analytics.ts';
import ModelEvents1 from '/Volumes/Data/Projects/Sleek/organizer-app/src/models/events.ts';
import ModelGlobal2 from '/Volumes/Data/Projects/Sleek/organizer-app/src/models/global.ts';
import ModelLogin3 from '/Volumes/Data/Projects/Sleek/organizer-app/src/models/login.ts';
import ModelSetting4 from '/Volumes/Data/Projects/Sleek/organizer-app/src/models/setting.ts';
import ModelUser5 from '/Volumes/Data/Projects/Sleek/organizer-app/src/models/user.ts';
import ModelVendors6 from '/Volumes/Data/Projects/Sleek/organizer-app/src/models/vendors.ts';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'analytics', ...ModelAnalytics0 });
app.model({ namespace: 'events', ...ModelEvents1 });
app.model({ namespace: 'global', ...ModelGlobal2 });
app.model({ namespace: 'login', ...ModelLogin3 });
app.model({ namespace: 'setting', ...ModelSetting4 });
app.model({ namespace: 'user', ...ModelUser5 });
app.model({ namespace: 'vendors', ...ModelVendors6 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // ?????? app???for gc
      // immer ?????? app ??? read-only ???????????? try catch ??????
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
