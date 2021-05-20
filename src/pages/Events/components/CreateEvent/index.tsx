import { Modal } from 'antd';
import { useState } from 'react';
import EventDetails from './EventDetails';
import InviteVendors from './InviteVendors';

export default (props: any) => {
  const { visible, onCloseModal } = props;

  const [currentStep, setCurrentStep] = useState('event_details');

  const renderContent = (step: string) => {
    return (
      <>
        <EventDetails visible={step === 'event_details'} onSubmit={() => setCurrentStep('invite_vendors')} />
        <InviteVendors
          visible={step === 'invite_vendors'}
          onBack={() => setCurrentStep('event_details')}
          onSubmit={() => onCloseModal()}
        />
      </>
    )
  };

  return (
    <>
      {visible && (
        <Modal visible={visible} closable={false} onCancel={onCloseModal}>
          {renderContent(currentStep)}
        </Modal>
      )}
    </>
  );
};
