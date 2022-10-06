import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { addChannel, removeChannel, renameChannel } from '../../slices/channelsSlice.js';
import { getCurrentChannelId } from '../../slices/currentChannelIdSlice.js';
import useSocket from '../../hooks/socketHook.jsx';
import DropDownMenu from './DropDownMenu';

function Channels({
  channels, currentChannelId, openModalAddChannel, openModalRenameChannel, openModalRemoveChannel,
}) {
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const renderChannels = (chnls, id) => chnls.map((channel) => {
    const variant = id === channel.id ? 'secondary' : 'light';
    return (
      <li className="nav-item w-100" key={channel.id} id={channel.id}>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start"
            variant={variant}
            onClick={() => dispatch(getCurrentChannelId(channel.id))}
          >
            #
            {' '}
            {channel.name}
          </Button>
          {channel.removable
            ? (
              <DropDownMenu
                name={channel.name}
                id={channel.id}
                variant={variant}
                openModalRenameChannel={openModalRenameChannel}
                openModalRemoveChannel={openModalRemoveChannel}
              />
            )
            : null}
        </Dropdown>
      </li>
    );
  });

  useEffect(() => {
    socket.on('newChannel', (data) => {
      dispatch(addChannel({ name: data.channel, id: data.id, removable: data.removable }));
      dispatch(getCurrentChannelId(data.id));
    });

    socket.on('removeChannel', (data) => {
      dispatch(removeChannel(data.id));
      dispatch(getCurrentChannelId(1));
    });

    socket.on('renameChannel', (data) => {
      dispatch(renameChannel(data));
    });
  }, [socket, dispatch]);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>
          {t('channels')}
        </span>
        <Button
          onClick={() => openModalAddChannel()}
          role="button"
          variant="outline-primary"
          className="btn-sm px-2 py-0 noFocus"
        >
          {t('add button')}
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {renderChannels(channels, currentChannelId)}
      </ul>
    </div>
  );
}

export default Channels;
