import { useEffect, useState } from 'react';
import { connect, useIntl } from 'umi';
import { Button, Card, Input } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumnType } from '@ant-design/pro-table';
import type { ConnectState } from '@/models/connect';
import ProTable from '@ant-design/pro-table';
import InviteVendor from '@/components/Modals/InviteVendor';
import styles from './Vendors.less';

const { Search } = Input;

const Vendors = (props: any) => {
  const { loading, vendors, dispatch } = props;

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const intl = useIntl();
  const { formatMessage } = useIntl();

  const loadVendors = () => {
    const organizerId = localStorage.getItem('organizer_id');
    dispatch({
      type: 'vendors/fetchVendors',
      payload: { organizerId },
    });
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const columns: ProColumnType<DataType>[] = [
    {
      title: 'Vendor Name',
      dataIndex: 'name',
      render: (dom) => <div style={{ color: '#6D5CFF' }}>{dom}</div>,
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
        switch (entity.status) {
          case 'ACTIVE':
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
    loading,
    columns,
    pagination: {
      show: true,
      pageSize: 10,
      current: 1,
      total: vendors.length,
    },
    size: 'large',
    expandable: false,
    headerTitle: 'Upcoming Events',
    tooltip: 'tooltip',
    showHeader: true,
    footer: false,
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
    <div>
      <PageContainer
        fixedHeader
        header={{
          title: intl.formatMessage({
            id: 'pages.vendors.list',
            defaultMessage: 'Vendors List',
          }),
          ghost: true,
          extra: [
            <Search
              className={styles.searchInput}
              placeholder={intl.formatMessage({
                id: 'pages.vendors.tableSearch.placeholder',
                defaultMessage: 'vendor name or email',
              })}
              allowClear
              enterButton="Search"
              onSearch={setSearchQuery}
            />,
          ],
        }}
      >
        <Card
          className={styles.cardContainer}
          bodyStyle={{ padding: 0 }}
          headStyle={{ borderBottom: 0, padding: '0' }}
          bordered={false}
          extra={
            <div className={styles.tableHeaderExtra}>
              <Button
                className={styles.newButton}
                type="primary"
                onClick={() => setShowModal(true)}
              >
                <span className={styles.plus}>+</span>New
              </Button>
              <div className={styles.reloadButton} onClick={() => loadVendors()}>
                <ReloadOutlined />
              </div>
            </div>
          }
          title={
            <div className={styles.cardTitle}>
              {formatMessage({
                id: 'pages.vendors.searchTable',
                defaultMessage: 'Search Table',
              })}
            </div>
          }
        >
          <ProTable
            {...tableConfig}
            headerTitle={tableConfig.headerTitle}
            columns={tableColumns}
            dataSource={
              vendors && vendors.length > 0 && searchQuery
                ? vendors.filter((item: any) => {
                    if (item.name) {
                      if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) return true;
                    }
                    if (item.email) {
                      if (item.email.toLowerCase().includes(searchQuery.toLowerCase())) return true;
                    }
                    return false;
                  })
                : vendors
            }
          />
        </Card>
      </PageContainer>

      <InviteVendor
        visible={showModal}
        onCloseModal={() => {
          setShowModal(false);
          loadVendors();
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export default connect(({ vendors, loading }: ConnectState) => ({
  vendors: vendors.vendors,
  loading: loading.models.vendors,
}))(Vendors);
