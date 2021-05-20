import { Menu, Dropdown } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const EventDropdownMenu = (props: any) => {
  const { onActionEmitted } = props;

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <p style={{ margin: 0 }} onClick={() => onActionEmitted('edit')}>
          Edit Event
        </p>
      </Menu.Item>
      <Menu.Item key="1">
        <p style={{ margin: 0 }} onClick={() => onActionEmitted('delete')}>
          Delete Event
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

export default EventDropdownMenu;
