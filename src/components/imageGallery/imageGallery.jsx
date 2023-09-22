import { Component } from 'react';
import css from './imageGallery.modules.css';
import imageAPI from '../utilites/imagesApi';
import ImageGalleryItem from '../imageGalleryItem/imageGalleryItem';
import Button from '../button/button';

export default class ImageGallery extends Component {
  state = {
    hits: [],
    pageCounter: 1,
    totalPages: 0,
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState(
        { pageCounter: 1, totalPages: 0, hits: [] },

        () => {
          this.fetchData();
        }
      );
    }
  }

  loadMorePages = () => {
    const { pageCounter, totalPages } = this.state;

    if (totalPages > pageCounter) {
      this.setState(
        prevState => {
          return {
            pageCounter: prevState.pageCounter + 1,
          };
        },
        () => {
          this.fetchData();   //! Добавить уведомление когда больше нет новых страниц
        }
      );
    }
  };

  fetchData = () => {
    imageAPI(this.props.searchQuery, this.state.pageCounter)
      .then(data => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
          totalPages: Math.ceil(data.totalHits / 12),
        }));
      })
      .catch(error => console.log(error.message));
  };

  render() {
    const { hits } = this.state;

    return hits.length > 0 ? (
      <div>
        <ul className="ImageGallery">
          {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        <Button loadMorePages={this.loadMorePages} />
      </div>
    ) : null;
  }
}
