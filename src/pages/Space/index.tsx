import { useIntl } from 'umi';
import { Col, Row } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import AreaCard from '../../components/Analytics/AreaCard';
import CameraCard from './components/CameraCard';
import StatisticCard from './components/StatisticsCard';

const Space = () => {
  const intl = useIntl();

  const tempAreaData = [
    {
      name: '00:30',
      value: 30,
    },
    {
      name: '01:00',
      value: 40,
    },
    {
      name: '01:30',
      value: 40,
    },
    {
      name: '02:00',
      value: 45,
    },
    {
      name: '02:30',
      value: 41,
    },
    {
      name: '03:00',
      value: 49,
    },
    {
      name: '03:30',
      value: 54,
    },
    {
      name: '04:00',
      value: 52,
    },
  ];

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
                breadcrumbName: 'Space',
              },
            ],
          },
          title: intl.formatMessage({
            id: 'pages.revenue.analytics',
            defaultMessage: 'Revenue Analytics',
          }),
          ghost: true,
          // extra: null,
        }}
      >
        <Row gutter={16}>
          <Col span={24} lg={12}>
            <AreaCard
              data={tempAreaData}
              plotConfig={{
                areaStyle: {
                  fill: 'transparent',
                },
                color: '#6D5CFF',
              }}
              title={intl.formatMessage({
                id: 'pages',
                defaultMessage: 'People Count',
              })}
            />
            <StatisticCard />
          </Col>
          <Col span={24} lg={12}>
            <CameraCard />
          </Col>
        </Row>
        <Row style={{ marginTop: 16 }}>
          <Col span={24}></Col>
        </Row>
      </PageContainer>
    </div>
  );
};

export default Space;
