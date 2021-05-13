import { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import { connect, useIntl } from 'umi';
import StatisticsCard from './components/Statistics';
import ChartCard from '../../components/Analytics/ChartCard';
import UpcomingEvents from './components/UpcomingEvents';
import type { ConnectState } from '@/models/connect';
import { getOrganizerId } from '@/utils/helper';

const Home = (props: any) => {
  const { homeData, loading, dispatch } = props;

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!homeData) {
      const organizerId = getOrganizerId();
      if (organizerId) {
        dispatch({
          type: 'analytics/fetchHomeAnalytics',
          payload: { organizerId },
        });
      }
    }
  }, [dispatch, homeData]);

  const getGraphData = (data: any, type: string) => {
    if (data && data.length > 0) {
      const tempData = [];
      data.forEach((item: any) => {
        const name = type === 'top_vendors' ? item.vendorName : item.eventName;
        tempData.push({
          name,
          value: item.tipRevenue,
          type: 'Tips',
        });
        tempData.push({
          name,
          value: item.skipLineFeeRevenue,
          type: 'Dynamic Fee',
        });
        tempData.push({
          name,
          value: item.subTotalRevenue,
          type: 'Subtotal',
        });
      });
      return tempData;
    }
    return [];
  };

  const size = 'large';

  return (
    <PageContainer loading={loading}>
      <Row gutter={16}>
        <Col span={24}>
          <StatisticsCard data={homeData} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <ChartCard
            title={formatMessage({
              id: 'pages.home.topVendorsByRevenue',
              defaultMessage: 'Top Vendors by Revenue',
            })}
            data={getGraphData(homeData && homeData.topVendors, 'top_vendors')}
          />
        </Col>
        <Col span={24} md={12}>
          <ChartCard
            title={formatMessage({
              id: 'pages.home.topEventsByRevenue',
              defaultMessage: 'Top Events by Revenue',
            })}
            data={getGraphData(homeData && homeData.topEvents, 'top_events')}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <UpcomingEvents size={size} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default connect(({ analytics, loading }: ConnectState) => ({
  homeData: analytics.home,
  loading: loading.models.analytics,
}))(Home);
