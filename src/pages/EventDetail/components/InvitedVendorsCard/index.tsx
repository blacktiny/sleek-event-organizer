import React from 'react';
import { Card } from 'antd';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useIntl } from 'umi';

import styles from './InvitedVendorsCard.less';

const InvitedVendors = () => {
  const { formatMessage } = useIntl();

  const tempData = [
    {
      vendorName: 'Vendor 001',
      description: 'Vel cras auctor at tortor imperdiet amet id sed rhoncus.',
      email: 'email@example.com',
      service: 'Kind of service',
      status: 'online',
    },
    {
      vendorName: 'Vendor 001',
      description: 'Quam aliquam odio ullamcorper ornare eleifend ipsum',
      email: 'email@example.com',
      service: 'Kind of service',
      status: 'offline',
    },
    {
      vendorName: 'Vendor 001',
      description: 'Mauris quam tristique et parturient sapien.',
      email: 'email@example.com',
      service: 'Kind of service',
      status: 'error',
    },
    {
      vendorName: 'Vendor 001',
      description: 'Fermentum porttitor amet, vulputate ornare tortor nisi',
      email: 'email@example.com',
      service: 'Kind of service',
      status: 'online',
    },
    {
      vendorName: 'Vendor 001',
      description: 'Sed at ornare scelerisque in facilisis tincidunt',
      email: 'email@example.com',
      service: 'Kind of service',
      status: 'running',
    },
  ];

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
      title: 'Service',
      dataIndex: 'service',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'option',
      render: (dom, entity) => {
        let bgColor = '#A6ADB4';
        switch (entity.status) {
          case 'online':
            bgColor = '#27AE60';
            break;
          case 'error':
            bgColor = '#FF4D4F';
            break;
          case 'running':
            bgColor = '#6D5CFF';
            break;
          default:
            bgColor = '#A6ADB4';
        }

        return [
          <div className={styles.statusCol}>
            <div className={styles.status} style={{ background: bgColor }} />
            {entity.status}
          </div>,
        ];
      },
    },
  ];

  const tableConfig = {
    bordered: false,
    loading: false,
    columns,
    pagination: {
      show: true,
      pageSize: 10,
      current: 1,
      total: 100,
    },
    size: 'small',
    expandable: false,
    headerTitle: 'Invited Vendors',
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
              id: 'pages.events.invitedVendors',
              defaultMessage: 'Invited Vendors',
            })}
          </div>
        }
      >
        <ProTable
          {...tableConfig}
          headerTitle={tableConfig.headerTitle}
          columns={tableColumns}
          dataSource={tempData}
        />
      </Card>
    </div>
  );
};

export default InvitedVendors;
