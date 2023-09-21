import { Component } from 'react';
import css from './imageGallery.modules.css';
import imageAPI from '../utilites/imagesApi';
import ImageGalleryItem from '../imageGalleryItem/imageGalleryItem';
import Button from '../button/button';

export default class ImageGallery extends Component {
  state = {
    images: [],
    pageCounter: 1,
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState(
        { pageCounter: 1 },

        () => {
          this.fetchData();
        }
      );
    }
  }

  loadMorePages = () => {
    this.setState(
      prevState => {
        return {
          pageCounter: prevState.pageCounter + 1,
        };
      },
      () => {
        this.fetchData();
      }
    );
  };

  fetchData = () => {
    imageAPI(this.props.searchQuery, this.state.pageCounter)
      .then(data => {
        this.setState({ images: data.hits });
      })
      .catch(error => console.log(error.message));
  };

  render() {
    const { images } = this.state;

    return (
      <div>
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        {images.length > 0 ? (
          <Button loadMorePages={this.loadMorePages} />
        ) : null}
      </div>
    );
  }
}
