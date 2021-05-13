import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Input } from 'antd';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { connect, useIntl } from 'umi';

import type { ConnectState } from '@/models/connect';
import { getOrganizerId } from '@/utils/helper';
import styles from './index.less';

const { Search } = Input;

const UpcomingEvents = (props: any) => {
  const { dispatch, events, loading, size } = props;

  const [searchKey, setSearchKey] = useState('');

  const { formatMessage } = useIntl();

  useEffect(() => {
    const dateFilter = `{"$gte": "${new Date().toISOString()}"}`;
    const organizerId = getOrganizerId();
    if (organizerId) {
      dispatch({
        type: 'events/fetchEvents',
        payload: { organizerId, filter: dateFilter },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableData = useMemo(() => {
    if (events && events?.length > 0) {
      let tmpEvents = JSON.parse(JSON.stringify(events));
      tmpEvents = tmpEvents.filter((eventItem: any) =>
        eventItem.name.toLowerCase().includes(searchKey.toLowerCase()),
      );
      return tmpEvents.map((eventItem: any) => {
        return {
          eventName: eventItem?.name,
          time: eventItem?.eventCalendar?.startTimestamp,
          vendors: eventItem?.stallIds?.length,
          status: eventItem?.status?.toLowerCase()
        }
      })
    }
    return [];
  }, [events, searchKey]);

  const columns: ProColumnType<DataType>[] = [
    {
      title: 'Event Name',
      dataIndex: 'eventName',
    },
    {
      title: 'Date/Starting Time',
      dataIndex: 'time',
      valueType: 'dateTime',
    },
    {
      title: 'Invited Vendors',
      dataIndex: 'vendors',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'option',
      render: (dom, entity) => {
        let bgColor = '#A6ADB4';
        switch (entity.status) {
          case 'active':
            bgColor = '#27AE60';
            break;
          case 'canceled':
            bgColor = '#FF4D4F';
            break;
          default:
            bgColor = '#A6ADB4';
        }

        const customStyle: React.CSSProperties = {
          maxWidth: 80,
          width: 80,
          height: 'fit-content',
          background: bgColor,
          borderRadius: 2,
          fontSize: 14,
          textTransform: 'capitalize',
          padding: '1px 8px',
          pointerEvents: 'none',
        };
        return [
          <Button type="primary" style={customStyle}>
            {entity.status}
          </Button>,
        ];
      },
    },
  ];

  const tableConfig = {
    bordered: false,
    loading,
    columns,
    pagination: {
      show: true,
      pageSize: 10,
      current: 1,
      total: events?.length,
    },
    size,
    expandable: false,
    headerTitle: 'Upcoming Events',
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
        extra={
          <div className="searh-extra">
            <Search placeholder="event name" allowClear enterButton="Search" onSearch={setSearchKey} size={size} />
          </div>
        }
        title={
          <div className={styles.cardTitle}>
            {formatMessage({
              id: 'pages.home.upcomingEvents',
              defaultMessage: 'Statistics',
            })}
          </div>
        }
      >
        <ProTable
          {...tableConfig}
          headerTitle={tableConfig.headerTitle}
          columns={tableColumns}
          dataSource={tableData}
        />
      </Card>
    </div>
  );
};

export default connect(({ events, loading }: ConnectState) => ({
  events: events.events,
  loading: loading.models.events,
}))(UpcomingEvents);
