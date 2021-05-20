import { DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import { getOrganizerId } from '@/utils/helper';
import styles from './CreateEvent.less';
import PickServiceLocationModal from './PickServiceLocationModal';

const { Option } = Select;

const InviteVendors = (props: any) => {
  const { newEventId, visible, vendorsList, loading, dispatch, onBack, onSubmit } = props;

  const [showMapModal, setShowMapModal] = useState(false);
  const [editLocationVendor, setEditLocationVendor] = useState(-1);
  const [vendors, setVendors] = useState([
    {
      vendorEmail: '',
      location: '',
      locationName: '',
    },
  ]);

  useEffect(() => {
    const organizerId = getOrganizerId();

    if (vendorsList.length < 1) {
      dispatch({
        type: 'vendors/fetchVendors',
        payload: { organizerId },
      });
    }

    dispatch({
      type: 'events/fetchEvents',
      payload: { organizerId },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddVendor = useCallback(() => {
    const curVendors = JSON.parse(JSON.stringify(vendors));
    curVendors.push({
      vendorEmail: '',
      location: '',
      locationName: '',
    });
    setVendors(curVendors);
  }, [vendors]);

  const handelDeleteVendor = useCallback(
    (indexOfVendor) => {
      const curVendors = JSON.parse(JSON.stringify(vendors));
      curVendors.splice(indexOfVendor, 1);
      setVendors(curVendors);
    },
    [vendors],
  );

  const vendorOptions = useMemo(() => {
    if (vendorsList.length > 0) {
      return vendorsList.map((vendor: any) => {
        return {
          label: vendor.email,
          // eslint-disable-next-line no-underscore-dangle
          value: vendor._id,
        };
      });
    }
    return [];
  }, [vendorsList]);

  const handleBack = useCallback(async () => {
    await dispatch({
      type: 'events/updateState',
      payload: {
        newEventId: '',
      },
    });
    onBack();
  }, [dispatch, onBack]);

  const handleInviteVendors = useCallback(async () => {
    if (newEventId && vendors.length > 0) {
      const promises = vendors.map((vendor) => {
        return dispatch({
          type: 'events/inviteEvent',
          payload: {
            eventId: newEventId,
            data: {
              vendorId: vendor.vendorEmail,
              location: {
                description: vendor?.locationName,
                position: vendor.location ? vendor.location.split(', ') : [0, 0],
              },
            },
          },
        });
      });
      await Promise.all(promises);
    }
    onSubmit();
  }, [dispatch, newEventId, onSubmit, vendors]);

  const handleCloseMapModal = useCallback(
    (location = null) => {
      if (location && editLocationVendor >= 0) {
        const tempVendors = JSON.parse(JSON.stringify(vendors));
        tempVendors[editLocationVendor].location = `${location.x}, ${location.y}`;
        setVendors(tempVendors);
      }
      setShowMapModal(false);
    },
    [editLocationVendor, vendors],
  );

  const size = 'large';

  if (!visible) return <></>;

  return (
    <div className={`${styles.inviteVendors} ${styles.modalContainer} ${styles.scroll}`}>
      <div className={styles.header}>
        <p className={styles.title}>Create an Event</p>
        <p className={styles.subtitle}>Invite Vendors</p>
      </div>

      <div className={styles.content}>
        <div>
          {vendors.map((item, index) => {
            return (
              <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                <div className={styles.row} style={{ marginRight: vendors.length > 1 ? 0 : 48 }}>
                  <Select
                    showSearch
                    className={styles.select}
                    placeholder="Select Vendor"
                    optionFilterProp="children"
                    size={size}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    value={item.vendorEmail}
                    onChange={(value) => {
                      const newVendors = JSON.parse(JSON.stringify(vendors));
                      newVendors[index].vendorEmail = value;
                      setVendors(newVendors);
                    }}
                  >
                    {vendorOptions.length > 0 &&
                      vendorOptions.map((vendorOption: any) => (
                        <Option value={vendorOption.value}>{vendorOption.label}</Option>
                      ))}
                  </Select>
                  {vendors.length > 1 && (
                    <div className={styles.deleteButton} onClick={() => handelDeleteVendor(index)}>
                      <DeleteOutlined />
                    </div>
                  )}
                </div>
                <div className={styles.row} style={{ marginRight: 48 }}>
                  <Input
                    placeholder="Location Name"
                    value={item.locationName}
                    size={size}
                    onChange={(e) => {
                      const newVendors = JSON.parse(JSON.stringify(vendors));
                      newVendors[index].locationName = e.target.value;
                      setVendors(newVendors);
                    }}
                  />
                </div>
                <div className={styles.row}>
                  <Input placeholder="Location" value={item.location} size={size} readOnly />
                  <div
                    className={styles.deleteButton}
                    onClick={() => {
                      setEditLocationVendor(index);
                      setShowMapModal(true);
                    }}
                  >
                    <EnvironmentOutlined />
                  </div>
                </div>
                {vendors.length !== index + 1 && <div className={styles.horizontalSplitter} />}
              </div>
            );
          })}
          <div className={styles.row}>
            <div className={styles.textAddButton} onClick={() => handleAddVendor()}>
              + Add New Service
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        {onBack && (
          <Button className={styles.backButton} size="large" onClick={() => handleBack()}>
            Back
          </Button>
        )}
        <Button
          className={styles.submitButton}
          type="primary"
          size="large"
          onClick={() => handleInviteVendors()}
          loading={loading}
        >
          Invite Vendors
        </Button>
      </div>

      {showMapModal && (
        <PickServiceLocationModal
          defaultValue={editLocationVendor >= 0 ? vendors[editLocationVendor].location : ''}
          visible={showMapModal}
          onCloseModal={handleCloseMapModal}
        />
      )}
    </div>
  );
};

export default connect(({ events, vendors, loading }: ConnectState) => ({
  newEventId: events.newEventId,
  vendorsList: vendors.vendors,
  loading: loading.models.events,
}))(InviteVendors);
