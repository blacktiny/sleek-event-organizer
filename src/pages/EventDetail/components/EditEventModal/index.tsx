import { DeleteOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Modal, TimePicker } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import { getOrganizerId, uploadImage } from '@/utils/helper';
import moment from 'moment';

import styles from './EditEventModal.less';
import { useEffect } from 'react';

const { TextArea } = Input;
const { RangePicker } = TimePicker;

type DateTimeGroupType = {
  data: any;
  size: SizeType;
  onChange?: any;
  onDeleteTime: any;
}

const DateTimeGroup = ({ data, size, onDeleteTime, onChange }: DateTimeGroupType) => {
  const hasDelete = data.times.length > 1;

  const format = 'h:mm a';

  return (
    <div className={styles.datetimeGroup}>
      <div className={styles.row}>
        <DatePicker className={styles.datePicker} value={data.date ? moment(data.date) : null} size={size} onChange={(value, dateString) => onChange(0, 'date', dateString)} />
      </div>
      {data.times.map((timeValue: any, index: number) => {
        return (
          <div key={index} className={styles.row}>
            <RangePicker use12Hours className={styles.rangePicker} value={[moment(timeValue[0]), moment(timeValue[1])]} format={format} size={size} onChange={(values) => { onChange(index, 'time', values) }} />
            {hasDelete && (
              <div className={styles.deleteButton} onClick={() => onDeleteTime(index)}>
                <DeleteOutlined />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const EditEventModal = (props: any) => {
  const { data, dispatch = null, isSucceed, visible, onCloseModal, loading } = props;

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [location, setLocation] = useState(data?.venue?.address);
  const [logoImage, setLogoImage] = useState({
    name: data.logoImagePath.split('/').pop(),
    preview: data.logoImagePath
  });
  const [bannerImage, setBannerImage] = useState({
    name: data.bannerImagePath.split('/').pop(),
    preview: data.bannerImagePath
  });
  const [eventMapImage, setEventMapImage] = useState({
    name: data?.venueMap?.url.split('/').pop(),
    preview: data?.venueMap?.url
  });
  const [imageType, setImageType] = useState('');
  const [dateTimes, setDateTimes] = useState([
    {
      date: new Date(data.eventCalendar.startTimestamp).toDateString(),
      times: [[data.eventCalendar.startTimestamp, data.eventCalendar.endTimestamp]],
    },
  ]);
  const [imageChanges, setImageChanges] = useState({
    logo: false,
    banner: false,
    map: false,
  });

  useEffect(() => {
    if (isSucceed) {
      dispatch({
        type: 'events/updateState',
        payload: {
          isSucceed: false
        },
      });
      onCloseModal();
    }
  }, [dispatch, isSucceed, onCloseModal]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      switch (imageType) {
        case 'logo':
          setLogoImage({
            name: acceptedFiles[0].name,
            type: acceptedFiles[0].type,
            size: acceptedFiles[0].size,
            preview: URL.createObjectURL(acceptedFiles[0])
          });
          setImageChanges({ ...imageChanges, logo: true })
          break;
        case 'banner':
          setBannerImage({
            name: acceptedFiles[0].name,
            type: acceptedFiles[0].type,
            size: acceptedFiles[0].size,
            preview: URL.createObjectURL(acceptedFiles[0])
          });
          setImageChanges({ ...imageChanges, banner: true })
          break;
        default:
          setEventMapImage({
            name: acceptedFiles[0].name,
            type: acceptedFiles[0].type,
            size: acceptedFiles[0].size,
            preview: URL.createObjectURL(acceptedFiles[0])
          });
          setImageChanges({ ...imageChanges, map: true })
      }
    },
  });

  const handleAddDate = useCallback(() => {
    const curDateTimes = JSON.parse(JSON.stringify(dateTimes));
    curDateTimes.push({
      date: '',
      times: [[]],
    });
    setDateTimes(curDateTimes);
  }, [dateTimes]);

  const handleAddTime = useCallback(() => {
    const curDateTimes = JSON.parse(JSON.stringify(dateTimes));
    curDateTimes[curDateTimes.length - 1].times.push([]);
    setDateTimes(curDateTimes);
  }, [dateTimes]);

  const handleDateTimeChange = useCallback(
    (indexOfDate, indexOfTime, valueType, value) => {
      const curDateTimes = JSON.parse(JSON.stringify(dateTimes));
      if (valueType === 'date') {
        curDateTimes[indexOfDate].date = value;
      } else {
        curDateTimes[indexOfDate].times[indexOfTime] = value;
      }
      setDateTimes(curDateTimes);
    },
    [dateTimes],
  );

  const handelDeleteDate = useCallback(
    (indexOfTime) => {
      const curDateTimes = JSON.parse(JSON.stringify(dateTimes));
      curDateTimes.splice(indexOfTime, 1);
      setDateTimes(curDateTimes);
    },
    [dateTimes],
  );

  const handleDeleteTime = useCallback(
    (indexOfDate, indexOfTime) => {
      const curDateTimes = JSON.parse(JSON.stringify(dateTimes));
      curDateTimes[indexOfDate].times.splice(indexOfTime, 1);
      setDateTimes(curDateTimes);
    },
    [dateTimes],
  );

  const handleSubmit = useCallback(async () => {
    // valdiate

    // firstly, upload image files
    const newlogo = imageChanges.logo ? await uploadImage(logoImage, dispatch) : logoImage.preview;
    const bannerImagePath = imageChanges.banner ? await uploadImage(bannerImage, dispatch) : bannerImage.preview;
    const venueMapImagePath = imageChanges.map ? await uploadImage(eventMapImage, dispatch) : eventMapImage.preview;

    // add new event
    const organizerId = getOrganizerId();
    if (dispatch && organizerId) {
      const eventDate = moment(dateTimes[0].date);
      const startTimestamp = moment(dateTimes[0].times[0][0]).year(eventDate.year()).month(eventDate.month()).date(eventDate.date());
      const endTimestamp = moment(dateTimes[0].times[0][1]).year(eventDate.year()).month(eventDate.month()).date(eventDate.date());
      await dispatch({
        type: 'events/updateEvent',
        payload: {
          eventId: data._id,
          data: {
            name,
            description,
            logoImagePath: newlogo,
            bannerImagePath,
            venue: {
              address: location,
            },
            venueMap: {
              url: venueMapImagePath
            },
            organizerId,
            eventCalendar: {
              startTimestamp: new Date(startTimestamp.toDate()).getTime(),
              endTimestamp: new Date(endTimestamp.toDate()).getTime(),
            }
          },
        },
      });
    }
  }, [bannerImage, data, dateTimes, description, dispatch, eventMapImage, imageChanges, location, logoImage, name]);

  const size = 'large';

  return (
    <Modal visible={visible} closable={false} onCancel={onCloseModal}>
      <div className={`${styles.eventDetails} ${styles.modalContainer}`}>
        <div className={styles.header}>
          <p className={styles.title}>Edit Event</p>
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <Input value={name} placeholder="Event Name" size={size} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={styles.row}>
            <TextArea value={description} placeholder="About Event" size={size} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className={styles.row}>
            <Input value={logoImage?.name} placeholder="Logo Image" size={size} readOnly />
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <Button size={size} onClick={() => setImageType('logo')}>Upload</Button>
            </div>
          </div>
          <div className={styles.row}>
            <Input value={bannerImage?.name} placeholder="Banner Image" size={size} readOnly />
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <Button size={size} onClick={() => setImageType('banner')}>Upload</Button>
            </div>
          </div>
          <div className={styles.row}>
            <Input value={location} placeholder="Location" size={size} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className={styles.row}>
            <Input value={eventMapImage?.name} placeholder="Event Map" size={size} readOnly />
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <Button size={size} onClick={() => setImageType('map')}>Upload</Button>
            </div>
          </div>
          {dateTimes.map((item, index) => {
            return (
              <>
                <div className={styles.row} style={{ margin: 0 }}>
                  <DateTimeGroup
                    key={index}
                    data={item}
                    size={size}
                    onChange={(number: number, dataType: string, value: string) => handleDateTimeChange(index, number, dataType, value)}
                    onDeleteTime={(indexOfTime: number) => handleDeleteTime(index, indexOfTime)}
                  />
                  {index > 0 && (
                    <div className={styles.deleteButton} onClick={() => handelDeleteDate(index)}>
                      <DeleteOutlined />
                    </div>
                  )}
                </div>
                {dateTimes.length !== index + 1 && <div className={styles.horizontalSplitter} />}
              </>
            );
          })}
          <div className={styles.row}>
            <div className={styles.textAddButton} onClick={() => handleAddTime()}>
              + Add Time Period
            </div>
            <div className={styles.textAddButton} onClick={() => handleAddDate()}>
              + Add Date
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Button
            className={styles.submitButton}
            size="large"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
          <Button
            className={styles.submitButton}
            type="primary"
            size="large"
            onClick={() => handleSubmit()}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default connect(({ events, loading }: ConnectState) => ({
  isSucceed: events.isSucceed,
  loading: loading.models.events,
}))(EditEventModal);
