import { useEffect, useMemo } from 'react';
import { connect } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import DetailsInfoCard from './components/DetailsInfoCard';
import ScanQRCodeCard from './components/ScanQRCodeCard';
import ServicesTableCard from './components/ServicesTableCard';
import VenueMapCard from './components/VenueMapCard';
import type { ConnectState } from '@/models/connect';

const EventDetail = (props: any) => {
  const {
    eventData = null,
    history: { location },
  } = props;

  const eventId = useMemo(() => {
    return location.pathname.split('/events/')[1];
  }, [location]);

  useEffect(() => {
    const { dispatch } = props;

    dispatch({
      type: 'events/fetchEventData',
      payload: { eventId },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, location]);

  return (
    <PageContainer
      header={{
        title: eventData?.name || '',
      }}
      loading={!eventData}
    >
      <Row gutter={16}>
        <Col span={24} lg={12}>
          <DetailsInfoCard data={eventData} />
        </Col>
        <Col span={24} lg={12}>
          <ScanQRCodeCard eventId={eventId} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ServicesTableCard eventId={eventId} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <VenueMapCard data={eventData?.invites} map={eventData?.venueMap && eventData?.venueMap?.url} />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default connect(({ events }: ConnectState) => ({
  eventData: events.eventData,
}))(EventDetail);
