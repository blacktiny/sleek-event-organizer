import { Card } from 'antd';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useIntl } from 'umi';

import { formatNumber } from '../../../../../../utils/helper';

import styles from './ParticipatingVendorsCard.less';

const InvitedVendors = (props: any) => {
  const { data } = props;

  const { formatMessage } = useIntl();

  const columns: ProColumnType<DataType>[] = [
    {
      title: 'Vendor Name',
      dataIndex: 'vendorName',
      render: (dom) => <div style={{ color: '#6D5CFF' }}>{dom}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      render: (dom, entity) => <div>{formatNumber(entity.revenue)}</div>,
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   valueType: 'option',
    //   render: (dom, entity) => {
    //     let bgColor = '#A6ADB4';
    //     switch (entity.status) {
    //       case 'online':
    //         bgColor = '#27AE60';
    //         break;
    //       case 'error':
    //         bgColor = '#FF4D4F';
    //         break;
    //       case 'running':
    //         bgColor = '#6D5CFF';
    //         break;
    //       default:
    //         bgColor = '#A6ADB4';
    //     }

    //     return [
    //       <div className={styles.statusCol}>
    //         <div className={styles.status} style={{ background: bgColor }} />
    //         {entity.status || 'unknown'}
    //       </div>,
    //     ];
    //   },
    // },
  ];

  const tableConfig = {
    bordered: false,
    loading: !data,
    columns,
    pagination: {
      show: true,
      pageSize: 10,
      current: 1,
      total: data?.length,
    },
    size: 'large',
    expandable: false,
    headerTitle: 'Participating Vendors',
    tooltip: '高级表格 tooltip',
    showHeader: true,
    footer: false,
    rowSelection: {},
    scroll: false,
    hasData: true,
    tableLayout: undefined,
    toolBarRender: false,
    search: false,
    options: {
      show: false,
      density: true,
      fullScreen: true,
      setting: true,
    },
  };

  const tableColumns = (tableConfig.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: tableConfig.ellipsis,
  }));

  return (
    <div className={styles.cardContainer}>
      <Card
        bodyStyle={{ padding: 0 }}
        headStyle={{ borderBottom: 0, padding: '8px 0' }}
        bordered={false}
        // extra={null}
        title={
          <div className={styles.cardTitle}>
            {formatMessage({
              id: 'pages.revenue.analytics.participatingVendors',
              defaultMessage: 'Participating Vendors',
            })}
          </div>
        }
      >
        <ProTable
          {...tableConfig}
          headerTitle={tableConfig.headerTitle}
          columns={tableColumns}
          dataSource={data}
        />
      </Card>
    </div>
  );
};

export default InvitedVendors;
