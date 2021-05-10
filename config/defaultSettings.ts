import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
  // button
  btnBorderRadiusBase: string;
  btnPrimaryBg: string;
  btnPrimaryShadow: string;
  // layout
  layoutHeaderBg: string;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#6d5cff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '',
  pwa: false,
  iconfontUrl: '',

  // user define
  // button
  btnBorderRadiusBase: '8px',
  btnPrimaryBg: 'linear-gradient(314.72deg, #6758F3 -1.5%, #E062F5 100%)',
  btnPrimaryShadow: '0px 2px 0px rgba(0, 0, 0, 0.043)',
  // layout
  layoutHeaderBg: '#fff',
};

export type { DefaultSettings };

export default proSettings;
