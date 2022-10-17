import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as modalActions } from '../../slices/modalsSlice.js';

const DropDownMenu = ({
  id, variant, name,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  const dispatch = useDispatch();

  const openModalRemoveChannel = (items) => {
    dispatch(modalActions.openModal(items));
  };
  const openModalRenameChannel = (items) => {
    dispatch(modalActions.openModal(items));
  };

  return (
    <>
      <Dropdown.Toggle id="dropdown-basic" variant={variant}>
        <span className="visually-hidden">{t('channel control')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => openModalRemoveChannel({ type: 'remove', id, name: null })}>{t('remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => openModalRenameChannel({ type: 'rename', id, name })}>{t('rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

export default DropDownMenu;
