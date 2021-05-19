import { useMemo } from 'react';
import { Col, Row } from 'antd';
import { useIntl } from 'umi';
import ParticipatingVendorsCard from './components/ParticipatingVendorsCard';
import ChartCard from '../../../../components/Analytics/ChartCard';
import PieCard from '../../../../components/Analytics/PieCard';

const Events = (props: any) => {
  const { data } = props;

  const { formatMessage } = useIntl();

  const pieData = useMemo(() => {
    return [
      {
        type: `Orders with Dynamic Fee`,
        value: data?.ordersOverview,
      },
      {
        type: 'All Orders',
        value: 100 - data?.ordersOverview,
      },
    ];
  }, [data]);

  const chartData = useMemo(() => {
    if (data?.topVendors && data?.topVendors?.length > 0) {
      const tempData = [];
      data?.topVendors.forEach((item: any) => {
        const name = item.vendorName;
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
  }, [data]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={12}>
          <ChartCard
            data={chartData}
            title={formatMessage({
              id: 'pages.home.topVendorsByRevenue',
              defaultMessage: 'Top Vendors by Revenue',
            })}
          />
        </Col>
        <Col span={24} lg={12}>
          <PieCard
            data={pieData}
            title={formatMessage({
              id: 'pages.revenue.ordersOverview',
              defaultMessage: 'Orders Overview',
            })}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ParticipatingVendorsCard data={data?.participatingVendors} />
        </Col>
      </Row>
    </div>
  );
};

export default Events;
