import { useMemo } from 'react';
import { Col, Row } from 'antd';
import { useIntl } from 'umi';
import AreaCard from '../../../../components/Analytics/AreaCard';
import ChartCard from '../../../../components/Analytics/ChartCard';
import PieCard from '../../../../components/Analytics/PieCard';

const Vendors = (props: any) => {
  const { data } = props;

  const { formatMessage } = useIntl();

  const pieData = useMemo(() => {
    return [
      {
        type: `Dynamic Fee's Share`,
        value: data?.dynamicFeePercentage,
      },
      {
        type: 'Revenue',
        value: 100 - data?.dynamicFeePercentage,
      },
    ];
  }, [data]);

  const getGraphData = useMemo(() => {
    if (data?.ordersPerWeek && data?.ordersPerWeek?.length > 0) {
      return data.ordersPerWeek.map((item: any) => {
        return {
          name: item.week,
          value: item.orderNum,
          type: 'Tips',
        };
      });
    }
    return [];
  }, [data]);

  const areaData = useMemo(() => {
    if (data?.dynamicFeePerWeek && data?.dynamicFeePerWeek?.length > 0) {
      return data.dynamicFeePerWeek.map((item: any) => {
        return {
          name: item.week,
          value: item.value,
        };
      });
    }
    return [];
  }, [data]);

  return (
    <div>
      <Row gutter={16}>
        <Col span={24} lg={12}>
          <PieCard
            data={pieData}
            title={formatMessage({
              id: 'pages.revenue.analytics.dynamicFreeOverview',
              defaultMessage: 'Dynamic Fee Overview',
            })}
          />
        </Col>
        <Col span={24} lg={12}>
          <ChartCard
            title={formatMessage({
              id: 'pages.revenue.analytics.orderPerWeek',
              defaultMessage: 'Order Per Week',
            })}
            data={getGraphData}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <AreaCard
            data={areaData}
            title={formatMessage({
              id: 'pages.revenue.analytics.dynamicFee',
              defaultMessage: 'Dynamic Fee',
            })}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Vendors;
