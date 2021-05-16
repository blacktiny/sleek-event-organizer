import { Select, Tag } from 'antd';
import { useCallback, useState } from 'react';

import styles from './MultiSelect.less';

export type MultiOptionItem = {
  label: string;
  value: string;
};

const MultiSelect = (props) => {
  const { options } = props;
  const [selected, setSelected] = useState([]);

  const onPreventMouseDown = (event: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const addTag = useCallback(
    (value) => {
      const newSelected = JSON.parse(JSON.stringify(selected));
      const optionItem = options.find((item: MultiOptionItem) => item.value === value);
      if (optionItem) newSelected.push(optionItem);
      setSelected(newSelected);
    },
    [options, selected],
  );

  const removeTag = useCallback(
    (value) => {
      const newSelected = JSON.parse(JSON.stringify(selected));
      const indexOfValue = options.findIndex((item: MultiOptionItem) => item.value === value);
      if (indexOfValue > -1) newSelected.splice(indexOfValue, 1);
      setSelected(newSelected);
    },
    [options, selected],
  );

  return (
    <div className={styles.wrapper}>
      <Select
        className={`custom-multi ${styles.select}`}
        mode="multiple"
        showArrow
        options={options}
        value={selected.map((item: MultiOptionItem) => item.value)}
        onDeselect={removeTag}
        onSelect={addTag}
        placeholder="Select..."
      />
      <div className={styles.tags}>
        {selected.map((item: MultiOptionItem) => {
          return (
            <Tag
              key={item.value}
              className={styles.tag}
              onMouseDown={onPreventMouseDown}
              closable={true}
              onClose={() => removeTag(item.value)}
              style={{ marginRight: 3 }}
            >
              {item.label}
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
