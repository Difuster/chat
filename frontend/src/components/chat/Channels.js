import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DropDownMenu from './DropDownMenu';
import { actions as modalActions } from '../../slices/modalsSlice.js';
import ModalWindow from '../ModalWindow.js';

function Channels({
  channels, currentChannelId, setCurrentChannel,
}) {
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const dispatch = useDispatch();

  const openModalAddChannel = (items) => {
    dispatch(modalActions.openModal(items));
  };

  const renderChannels = (chnls, id) => chnls.map((channel) => {
    const variant = id === channel.id ? 'secondary' : 'light';
    return (
      <li className="nav-item w-100" key={channel.id} id={channel.id}>
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start text-truncate"
            variant={variant}
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            style={{ overflow: 'hidden' }}
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
              />
            )
            : null}
        </Dropdown>
      </li>
    );
  });

  return (
    <>
      <ModalWindow />
      <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
        <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
          <span>
            {t('channels')}
          </span>
          <Button
            onClick={() => openModalAddChannel({ type: 'add', id: 0, name: null })}
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
    </>
  );
}

export default Channels;
