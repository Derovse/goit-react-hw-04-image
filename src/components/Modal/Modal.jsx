import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ imgModal, onClose, modalTags }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.customModal}>
        <img
          className={css.centeredImage}
          src={imgModal}
          alt={modalTags}
          loading="lazy"
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imgModal: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  modalTags: PropTypes.string.isRequired,
};

export default Modal;
