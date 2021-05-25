import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Input } from 'antd';
import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { connect, useIntl } from 'umi';
import AddServiceModal from '../AddServiceModal';
import type { ConnectState } from '@/models/connect';
import ConfirmMessage from '@/components/Modals/ConfirmMessage';

import styles from './ServicesTableCard.less';
import { useCallback } from 'react';

const ServicesTableCard = (props: any) => {
  const {
    eventData: { invites = [] },
    eventId,
    loading,
    dispatch,
  } = props;

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [selectedInviteId, setSelectedInviteId] = useState('');

  const { formatMessage } = useIntl();

  useEffect(() => {
    dispatch({
      type: 'events/fetchEventInvites',
      payload: { eventId },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  // parse stalls list and get data list for services table
  const listData = useMemo(() => {
    if (invites.length > 0) {
      return invites.map((invite: any) => {
        return {
          id: invite?._id,
          location: invite?.location?.description || '',
          vendor: {
            logo: invite?.vendorLogoImagePath || '',
            name: invite?.vendorName || '',
          },
          email: invite?.vendorEmail || '',
          status: invite.status,
        };
      });
    }

    return [];
  }, [invites]);

  const handleDeleteInvite = useCallback(async(confirmed) => {
    if (confirmed && eventId && selectedInviteId) {
      await dispatch({
        type: 'events/deleteInvite',
        payload: { eventId, inviteId: selectedInviteId },
      })
    }
    setVisibleConfirm(false);
  }, [dispatch, eventId, selectedInviteId]);

  const columns: ProColumnType<DataType>[] = [
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      render: (dom, entity) => {
        return (
          <div className={styles.vendorTbField}>
            <div className={styles.logoContainer}>
              {entity.vendor.logo ? (
                <img src={entity.vendor.logo} alt={`logo_${entity.vendor.name}`} />
              ) : (
                'V'
              )}
            </div>
            {entity.vendor.name}
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'option',
      render: (dom, entity) => {
        let bgColor = '#A6ADB4';
        switch (entity.status.toLowerCase()) {
          case 'accepted':
            bgColor = '#52C41A';
            break;
          case 'pending':
            bgColor = '#6D5CFF';
            break;
          case 'declined':
            bgColor = '#FF5C5C';
            break;
          default:
            bgColor = '#A6ADB4';
        }

        return (
          <div key={entity.service} className={styles.statusCol}>
            <div className={styles.status} style={{ background: bgColor }} />
            {entity.status}
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'status',
      render: (dom, entity) => {
        if (entity.status !== 'declined')
          return (
            <div className={styles.actionButton}>
              <EyeOutlined />
            </div>
          );
        return <></>;
      },
    },
    {
      title: '',
      render: (dom, entity) => (
        <div className={styles.actionButton} onClick={() => {
          setSelectedInviteId(entity.id);
          setVisibleConfirm(true);
        }}>
          <DeleteOutlined />
        </div>
      ),
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
      total: listData.length,
    },
    size: 'small',
    expandable: false,
    headerTitle: 'Services',
    tooltip: '高级表格 tooltip',
    showHeader: true,
    footer: false,
    rowSelection: false,
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
          <div className={styles.extra}>
            <Input placeholder="Search" prefix={<SearchOutlined />} />
            <Button
              className={styles.addButton}
              type="primary"
              onClick={() => setShowAddServiceModal(true)}
            >
              <span className={styles.plus}>+</span>
              Add new service
            </Button>
          </div>
        }
        title={
          <div className={styles.cardTitle}>
            {formatMessage({
              id: 'pages.events.services',
              defaultMessage: 'Services',
            })}
          </div>
        }
      >
        <ProTable
          {...tableConfig}
          headerTitle={tableConfig.headerTitle}
          columns={tableColumns}
          dataSource={listData}
        />
      </Card>

      <AddServiceModal
        dispatch={dispatch}
        eventId={eventId}
        visible={showAddServiceModal}
        onCloseModal={() => setShowAddServiceModal(false)}
      />

      <ConfirmMessage visible={visibleConfirm} message={'Are you sure you want to delete this invite?'} onConfirmed={handleDeleteInvite} />
    </div>
  );
};

export default connect(({ events, loading }: ConnectState) => ({
  eventData: events.eventData,
  loading: loading.models.events,
}))(ServicesTableCard);
