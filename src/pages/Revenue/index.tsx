import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect, useIntl } from 'umi';
import { Select } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import RevenueVendors from './components/Vendors';
import RevenueEvents from './components/Events';
import type { ConnectState } from '@/models/connect';
import { getOrganizerId } from '@/utils/helper';
import styles from './Revenue.less';

const { Option } = Select;

const Revenue = (props: any) => {
  const { events, loading, revenueData, vendors, dispatch } = props;

  const [currentTab, setCurrentTab] = useState('vendors');
  const [currentVendor, setCurrentVendor] = useState('');
  const [currentEvent, setCurrentEvent] = useState('');

  const intl = useIntl();

  useEffect(() => {
    if (!vendors || vendors?.length < 1) {
      const organizerId = getOrganizerId();
      if (organizerId) {
        dispatch({
          type: 'vendors/fetchVendors',
          payload: { organizerId },
        });
      }
    } else {
      setCurrentVendor(vendors[0]._id);
    }
  }, [dispatch, vendors]);

  useEffect(() => {
    if (!events || events?.length < 1) {
      const organizerId = getOrganizerId();
      if (organizerId) {
        dispatch({
          type: 'events/fetchEvents',
          payload: { organizerId, filter: '' },
        });
      }
    } else {
      setCurrentEvent(events[0]._id);
    }
  }, [dispatch, events]);

  const fetchRevenueVendorAnalytics = () => {
    const organizerId = getOrganizerId();
    if (organizerId) {
      dispatch({
        type: 'analytics/fetchRevenueVendorAnalytics',
        payload: { organizerId, vendorId: currentVendor },
      });
    }
  }

  const fetchRevenueEventAnalytics = () => {
    const organizerId = getOrganizerId();
    if (organizerId) {
      dispatch({
        type: 'analytics/fetchRevenueEventAnalytics',
        payload: { organizerId, eventId: currentEvent },
      });
    }
  }

  useEffect(() => {
    if (currentTab === 'vendors' && currentVendor) {
      fetchRevenueVendorAnalytics();
    } else if (currentTab === 'events' && currentEvent) {
      fetchRevenueEventAnalytics();
    }
  }, [currentEvent, currentTab, currentVendor]);

  useEffect(() => {
    if (currentTab === 'vendors' && vendors?.length > 0) {
      setCurrentVendor(vendors[0]._id);
    }
    if (currentTab === 'events' && events?.length > 0) {
      setCurrentEvent(events[0]._id);
    }
  }, [currentTab, events, vendors]);

  const tabListData = useMemo(
    () => [
      {
        tab: intl.formatMessage({
          id: 'menu.vendors',
          defaultMessage: 'Vendors',
        }),
        key: 'vendors',
        closable: false,
      },
      {
        tab: intl.formatMessage({
          id: 'menu.events',
          defaultMessage: 'Events',
        }),
        key: 'events',
        closable: false,
      },
    ],
    [],
  );

  const renderContent = useMemo(() => {
    switch (currentTab) {
      case 'vendors':
        return <RevenueVendors data={revenueData} />;
      case 'events':
        return <RevenueEvents data={revenueData} />;
      default:
        return <></>;
    }
  }, [currentTab, revenueData]);

  const handleChange = useCallback((value: string) => {
    setCurrentVendor(value)
  }, []);

  const optionsData = useMemo(() => {
    if (currentTab === 'vendors') {
      if (vendors && vendors.length > 0) {
        return vendors.map((vendor: any) => ({ name: vendor?.name, value: vendor._id }));
      }

      return [];
    }

    if (currentTab === 'events') {
      if (events && events.length > 0) {
        return events.map((event: any) => ({ name: event?.name, value: event._id }));
      }

      return [];
    }

    return [];
  }, [currentTab, events, vendors]);

  return (
    <div>
      <PageContainer
        fixedHeader
        header={{
          breadcrumb: {
            routes: [
              {
                path: '',
                breadcrumbName: 'Home',
              },
              {
                path: '',
                breadcrumbName: 'Analytics',
              },
              {
                path: '',
                breadcrumbName: currentTab,
              },
            ],
          },
          title: intl.formatMessage({
            id: 'pages.revenue.analytics',
            defaultMessage: 'Revenue Analytics',
          }),
          ghost: true,
          extra: [
            <Select
              className={`${styles.select} custom`}
              value={currentTab === 'vendors' ? currentVendor : currentEvent}
              onChange={handleChange}
            >
              {optionsData.length > 0 && optionsData.map((option: any) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Select>,
          ],
        }}
        tabList={tabListData}
        onTabChange={setCurrentTab}
        loading={loading}
      >
        {renderContent}
      </PageContainer>
    </div>
  );
};

export default connect(({ analytics, events, loading, vendors }: ConnectState) => ({
  events: events.events,
  revenueData: analytics.revenue,
  loading: loading.models.analytics,
  vendors: vendors.vendors,
}))(Revenue);
