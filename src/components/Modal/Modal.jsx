import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Backdrop, ModalWindow, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    const handleEscClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  return createPortal(
    <Backdrop onClick={onClose}>
      <ModalWindow>
        <Image src={url} alt={alt} />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
