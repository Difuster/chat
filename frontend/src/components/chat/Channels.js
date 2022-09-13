import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { getCurrentId } from '../../slices/currentChannelIdSlice.js';
import addChannelIcon from '../../imgs/add_channel.png';

function Channels(props) {
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const dispatch = useDispatch();

  const DropDownMenu = ({ id, variant, name }) => {
    return (
      <>
        <Dropdown.Toggle id="dropdown-basic" variant={variant}>
          <span className="visually-hidden">{t('channels')}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => props.handleRemoveChannel(id)}>{t('remove')}</Dropdown.Item>
          <Dropdown.Item onClick={() => props.handleRenameChannel(id, name)}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </>
    );
  };

  const renderChannels = (chnls, id) => chnls.map((channel) => {
    const variant = id === channel.id ? 'secondary' : 'light';
    const classNames = cn('w-100', 'rounded-0', 'text-start');
    return (
      <li className="nav-item w-100" key={channel.id} id={channel.id}>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button className={classNames} onClick={() => dispatch(getCurrentId(channel.id))} variant={variant}>
            <span className="me-1">
            #
            {' '}
            {channel.name}</span>
          </Button>
          {channel.removable
            ? <DropDownMenu
              name={channel.name}
              id={channel.id}
              variant={variant}
              handleRemoveChannel={props.handleRemoveChannel}
              handleRenameChannel={props.handleRenameChannel}
            />
            : null
          }
        </Dropdown>
      </li>
    );
  });

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
    <div className="d-flex justify-content-between mb-2 ps-4 pe-2"><span>{t('channels')}</span>
      <button onClick={(e) => props.showModal(e)} type="button" className="p-0 text-primary btn btn-group-vertical">
        <span><img style={{ width: '20px', height: '20px' }} src={addChannelIcon} /></span>
      </button>
    </div>
    <ul className="nav flex-column nav-pills nav-fill px-2">
      {renderChannels(props.channels, props.currentChannelId)}
    </ul>
    </div>
  );
}

export default Channels;
