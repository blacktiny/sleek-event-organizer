import { useCallback, useState } from 'react';
import { Select } from 'antd';
import styles from './CameraCard.less';

const { Option } = Select;

const CameraCard = () => {
  const [curEventOption, setCurEventOption] = useState('the_lumineers');
  const [curArenaOption, setCurArenaOption] = useState('arena_307');

  const tempEventsOptions = [
    {
      name: 'The Lumineers',
      value: 'the_lumineers',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];

  const tempArenasOptions = [
    {
      name: 'Arena 307',
      value: 'arena_307',
    },
    {
      name: 'Other',
      value: 'other',
    },
  ];

  const handleEventChange = useCallback((value) => {
    setCurEventOption(value);
  }, []);

  const handleArenaChange = useCallback((value) => {
    setCurArenaOption(value);
  }, []);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Statistic</div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.row}>
          <div className={styles.select}>
            <p>Select Event</p>
            <Select
              style={{ width: '100%' }}
              defaultValue={curEventOption}
              onChange={handleEventChange}
            >
              {tempEventsOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.select}>
            <p>Select Arena</p>
            <Select
              style={{ width: '100%' }}
              defaultValue={curArenaOption}
              onChange={handleArenaChange}
            >
              {tempArenasOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className={styles.playerContainer}>
          <video className={styles.player} controls>
            <source src={'https://admin.sleek.fyi/video/sleek_cam1.mp4'} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default CameraCard;
