import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { getCurrentId } from '../../slices/currentChannelIdSlice.js';
import addChannelIcon from '../../imgs/add_channel.png';

const DropDownMenu = (props) => {
  return (
    <>
      <Dropdown.Toggle id="dropdown-basic" variant={props.variant}>
        q
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>Удалить</Dropdown.Item>
        <Dropdown.Item>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

function Channels(props) {
  const dispatch = useDispatch();

  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId.id);

  const renderChannels = (chnls, id) => chnls.map((channel) => {
    const variant = id === channel.id ? 'secondary' : 'light';
    const classNames = cn('w-100', 'rounded-0', 'text-start');
    return (
      <li className="nav-item w-100" key={channel.id} id={channel.id}>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button className={classNames} onClick={() => dispatch(getCurrentId(channel.id))} variant={variant}>
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          {channel.removable ? <DropDownMenu variant={variant}/> : null}
        </Dropdown>
      </li>
    );
  });

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2"><span>Каналы</span>
      <button onClick={(e) => props.handleAddChannel(e)} type="button" className="p-0 text-primary btn btn-group-vertical">
        <span><img style={{ width: '20px', height: '20px' }} src={addChannelIcon} /></span>
      </button>
    </div>
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {renderChannels(channels, currentChannelId)}
    </ul>
    </div>
  );
}

export default Channels;
