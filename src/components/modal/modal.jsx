import css from './modal.modules.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyClose);
  }

  keyClose = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClose = e => {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <div className="overlay" onClick={e => this.handleClose(e)}>
        <div className="modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
