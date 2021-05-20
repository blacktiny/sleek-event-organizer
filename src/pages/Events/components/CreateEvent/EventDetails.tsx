import { DeleteOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, TimePicker } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import styles from './CreateEvent.less';
import { getOrganizerId, uploadImage } from '@/utils/helper';
import moment from 'moment';
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
            <RangePicker use12Hours className={styles.rangePicker} value={timeValue} format={format} size={size} onChange={(values) => { onChange(index, 'time', values) }} />
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

const EventDetails = (props: any) => {
  const { newEventId, visible, dispatch, onSubmit } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [logoImage, setLogoImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [eventMapImage, setEventMapImage] = useState(null);
  const [imageType, setImageType] = useState('');
  const [dateTimes, setDateTimes] = useState([
    {
      date: '',
      times: [[]],
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newEventId) {
      onSubmit();
    }
  }, [newEventId, onSubmit]);

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
          break;
        case 'banner':
          setBannerImage({
            name: acceptedFiles[0].name,
            type: acceptedFiles[0].type,
            size: acceptedFiles[0].size,
            preview: URL.createObjectURL(acceptedFiles[0])
          });
          break;
        default:
          setEventMapImage({
            name: acceptedFiles[0].name,
            type: acceptedFiles[0].type,
            size: acceptedFiles[0].size,
            preview: URL.createObjectURL(acceptedFiles[0])
          });
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

    setLoading(true);

    // firstly, upload image files
    const newlogo = await uploadImage(logoImage, dispatch);
    const bannerImagePath = await uploadImage(bannerImage, dispatch);
    const venueMapImagePath = await uploadImage(eventMapImage, dispatch);

    // add new event
    const organizerId = getOrganizerId();
    if (dispatch && organizerId) {
      const eventDate = moment(dateTimes[0].date);
      const startTimestamp = moment(dateTimes[0].times[0][0]).year(eventDate.year()).month(eventDate.month()).date(eventDate.date());
      const endTimestamp = moment(dateTimes[0].times[0][1]).year(eventDate.year()).month(eventDate.month()).date(eventDate.date());
      await dispatch({
        type: 'events/addNewEvent',
        payload: {
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
            stallIds: [],
            eventCalendar: {
              startTimestamp: new Date(startTimestamp.toDate()).getTime(),
              endTimestamp: new Date(endTimestamp.toDate()).getTime(),
            }
          },
        },
      });
    }

    setLoading(false);
  }, [bannerImage, dateTimes, description, dispatch, eventMapImage, location, logoImage, name]);

  const size = 'large';

  if (!visible) return <></>

  return (
    <div className={`${styles.eventDetails} ${styles.modalContainer}`}>
      <div className={styles.header}>
        <p className={styles.title}>Create an Event</p>
        <p className={styles.subtitle}>Event Details</p>
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
                  onChange={(number, dataType, value) => handleDateTimeChange(index, number, dataType, value)}
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
          type="primary"
          size="large"
          onClick={() => handleSubmit()}
          loading={loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default connect(({ events }: ConnectState) => ({
  newEventId: events.newEventId,
}))(EventDetails);
