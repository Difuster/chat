import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import showModal from '../modal/index.js';
import { actions as modalActions, selectModalItems, selectIsModalShown } from '../slices/modalsSlice.js';
import { selectAllChannels } from '../slices/channelsSlice.js';

const ModalWindow = () => {
  const isShown = useSelector(selectIsModalShown);
  const items = useSelector(selectModalItems);
  const { type } = useSelector(selectModalItems);
  const channels = useSelector(selectAllChannels);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal({ type: null, id: 0, name: null }));
  };

  const CurrentModal = showModal(type);

  return (
    <Modal show={isShown} onHide={handleCloseModal}>
      {CurrentModal && (
        <CurrentModal
          handleCloseModal={handleCloseModal}
          channels={channels}
          items={items}
        />
      )}
    </Modal>
  );
};

export default ModalWindow;
