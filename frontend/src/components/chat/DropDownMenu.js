import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DropDownMenu = ({
  openModalRenameChannel, openModalRemoveChannel, id, variant, name
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'channels' });
  return (
    <>
      <Dropdown.Toggle id="dropdown-basic" variant={variant}>
        <span className="visually-hidden">{t('channels')}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => openModalRemoveChannel(id)}>{t('remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => openModalRenameChannel(id, name)}>{t('rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};

export default DropDownMenu;
