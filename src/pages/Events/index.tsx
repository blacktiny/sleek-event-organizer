import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect, useIntl } from 'umi';
import { Button, DatePicker, Input, List } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
import UpcomingEventCard from './components/UpcomingEventCard';
import CreateEvent from './components/CreateEvent';
import type { ConnectState } from '@/models/connect';
import styles from './Events.less';
import { getOrganizerId } from '@/utils/helper';

const { RangePicker } = DatePicker;

const AddCard = ({ onAddEvent }: any) => {
  return (
    <div className={styles.addCardContainer}>
      <Button className={styles.plusBtn} type="primary" onClick={onAddEvent}>
        +
      </Button>
    </div>
  );
};

const Events = (props: any) => {
  const { events, history, loading, dispatch } = props;

  const [currentTab, setCurrentTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [filterDates, setFilterDates] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const intl = useIntl();

  const reloadPage = (filterType: string) => {
    let dateFilter = '';
    if (filterType === 'upcoming') {
      dateFilter = `{"$gte": "${new Date().toISOString()}"}`;
    } else if (filterType === 'passed') {
      dateFilter = `{"$lte": "${new Date().toISOString()}"}`;
    }

    const organizerId = getOrganizerId();
    if (organizerId) {
      dispatch({
        type: 'events/fetchEvents',
        payload: { organizerId, filter: dateFilter },
      });
    }
  }

  useEffect(() => {
    reloadPage(currentTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const eventsData = useMemo(() => {
    let tmpEvents = JSON.parse(JSON.stringify(events));
    if (filterDates) {
      if (filterDates[0]) {
        const startFilterDate = new Date(moment(filterDates[0]).toDate()).getTime();
        tmpEvents = tmpEvents.filter((eventItem: any) => {
          if (eventItem.eventCalendar) {
            const startEventDate = new Date(eventItem.eventCalendar.startTimestamp).getTime();
            return startEventDate >= startFilterDate;
          }
          return false;
        });
      }
      if (filterDates[1]) {
        const endFilterDate = new Date(moment(filterDates[1]).toDate()).getTime();
        tmpEvents = tmpEvents.filter((eventItem: any) => {
          if (eventItem.eventCalendar) {
            const startEventDate = new Date(eventItem.eventCalendar.startTimestamp).getTime();
            return startEventDate <= endFilterDate;
          }
          return false;
        });
      }
    }
    if (searchKey) {
      tmpEvents = tmpEvents.filter((eventItem: any) =>
        eventItem.name.toLowerCase().includes(searchKey.toLowerCase()),
      );
    }
    tmpEvents.push('add');
    return tmpEvents;
  }, [events, filterDates, searchKey]);

  const tabListData = useMemo(
    () => [
      {
        tab: intl.formatMessage({
          id: 'menu.events.all',
          defaultMessage: 'All Events',
        }),
        key: 'all',
        closable: false,
      },
      {
        tab: intl.formatMessage({
          id: 'menu.events.upcoming',
          defaultMessage: 'Upcoming',
        }),
        key: 'upcoming',
        closable: false,
      },
      {
        tab: intl.formatMessage({
          id: 'menu.events.passed',
          defaultMessage: 'Passed',
        }),
        key: 'passed',
        closable: false,
      },
    ],
    [intl],
  );

  const renderCardItem = useCallback(
    (item, index) => {
      if (item === 'add') {
        return <AddCard key={index} onAddEvent={() => setShowModal(true)} />;
      }

      return <UpcomingEventCard key={index} history={history} data={item} dispatch={dispatch} />;
    },
    [dispatch, history],
  );

  return (
    <div>
      <PageContainer
        loading={loading}
        fixedHeader
        header={{
          title: intl.formatMessage({
            id: 'pages.events.eventsManagement',
            defaultMessage: 'Events Management',
          }),
          ghost: true,
          extra: [
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={(value) => setFilterDates(value)}
              onOk={(ranged) => setFilterDates(ranged)}
              size="large"
              value={filterDates}
            />,
            <Input
              className={styles.searchInput}
              placeholder="search"
              allowClear
              prefix={<SearchOutlined />}
              size="large"
              onChange={(e) => setSearchKey(e.target.value)}
            />,
            <Button
              type="primary"
              size="large"
              style={{ padding: '6.5px 50px' }}
              onClick={() => setShowModal(true)}
            >
              {intl.formatMessage({
                id: 'pages.events.newEvent',
                defaultMessage: 'New Event',
              })}
            </Button>,
          ],
        }}
        tabList={tabListData}
        onTabChange={setCurrentTab}
      >
        <List
          grid={{ gutter: 16, column: 2, xxl: 5, xl: 4, lg: 3, xs: 1 }}
          dataSource={eventsData}
          renderItem={renderCardItem}
        />
      </PageContainer>

      <CreateEvent
        visible={showModal}
        isNew
        onCloseModal={
          () => {
            setShowModal(false);
            reloadPage(currentTab);
          }
        }
      />
    </div>
  );
};

export default connect(({ events, loading }: ConnectState) => ({
  events: events.events,
  loading: loading.models.events,
}))(Events);
