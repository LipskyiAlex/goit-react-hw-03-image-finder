import { Component } from 'react';
import Modal from 'components/modal/modal';
import css from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {

  state = {
    modal: false,
  };

  toggleModal = () => {

    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { modal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <li className={css.imageGalleryItem} onClick={this.toggleModal}>
        <img
          className={css.imageGalleryItem_image}
          src={webformatURL}
          alt={tags}
          width="200"
        />
        {modal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
