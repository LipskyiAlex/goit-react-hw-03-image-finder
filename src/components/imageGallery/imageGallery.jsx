import { Component } from 'react';
import css from './imageGallery.module.css';
import ImageGalleryItem from '../imageGalleryItem/imageGalleryItem';

export default class ImageGallery extends Component {

 
  render() {

    const { hits} = this.props;

    return hits.length > 0 ? (
      <div>
        <ul className={css.imageGallery}>
          {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>  
      </div>
    ) : null;
  }
}
