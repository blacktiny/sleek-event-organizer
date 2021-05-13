import { GlobalOutlined } from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from 'umi';
import { Link, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import { ReactComponent as ReactLogo } from '../assets/logo.svg';
import styles from './UserLayout.less';

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const USER_LOGIN_URL = '/user/login';

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  const isLoginPage = location.pathname === USER_LOGIN_URL;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.topHeader}>
          {!isLoginPage && (
            <Link to="/">
              <ReactLogo className={styles.topHeaderLogo} />
            </Link>
          )}
          <div className={styles.lang}>
            <GlobalOutlined />
          </div>
        </div>
        <div className={styles.content}>
          {isLoginPage && (
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <ReactLogo className={styles.topLogo} />
                </Link>
              </div>
              <div className={styles.desc}>
                <FormattedMessage
                  id="pages.layouts.userLayout.title"
                  defaultMessage="Welcome to the organizer dashboard"
                />
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
