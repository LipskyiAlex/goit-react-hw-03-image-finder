import { Component } from 'react';
import css from './imageGallery.modules.css';
import imageAPI from '../utilites/imagesApi';
import ImageGalleryItem from '../imageGalleryItem/imageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    images: [],
  };

  componentDidUpdate(prevProps) {

    if (this.props.searchQuery !== prevProps.searchQuery) {
      imageAPI(this.props.searchQuery)
        .then(data => {
          this.setState({ images: data.hits });
        })
        .catch(error => console.log(error.message));
    }
  }

  

  render() {
    const { images} = this.state;

    return (
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} tags={tags}/>
        ))}
      </ul>
    );
  }
}
