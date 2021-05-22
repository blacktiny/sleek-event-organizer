import { Modal } from 'antd';
import InviteVendors from '@/pages/Events/components/CreateEvent/InviteVendors';
import { useEffect } from 'react';

export default (props: any) => {
  const { dispatch = null, eventId = '', visible, onCloseModal } = props;

  useEffect(() => {
    if (dispatch && eventId && visible) {
      dispatch({
        type: 'events/updateState',
        payload: {
          newEventId: visible ? eventId : ''
        }
      });
    }
  }, [dispatch, eventId, visible])

  return (
    <>
      {visible ? (
        <Modal visible={true} closable={false} onCancel={onCloseModal}>
          <InviteVendors
            visible={true}
            onBack={null}
            onSubmit={() => onCloseModal()}
          />
        </Modal>
      ) : <></>}
    </>
  );
};
