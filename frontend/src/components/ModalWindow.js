import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import showModal from '../modal/index.js';
import { actions as modalActions } from '../slices/modalsSlice.js';

const ModalWindow = () => {
  const isShown = useSelector((state) => state.modals.isShown);
  const items = useSelector((state) => state.modals.items);
  const { type } = items;
  const channels = useSelector((state) => state.channels.channels);
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
      />)}
    </Modal>
  );
};

export default ModalWindow;
