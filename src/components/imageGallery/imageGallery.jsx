import { Component } from 'react';
import css from './imageGallery.module.css';
import imageAPI from '../utilites/imagesApi';
import ImageGalleryItem from '../imageGalleryItem/imageGalleryItem';
import Button from '../button/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../loader/loader';


export default class ImageGallery extends Component {
  state = {
    hits: [],
    pageCounter: 1,
    totalPages: 0,
    status:"idle"
  };

  componentDidUpdate(prevProps) {

    if (this.props.searchQuery !== prevProps.searchQuery) {

      this.setState(
        { pageCounter: 1, totalPages: 0, hits: [],status:"pending"},

        () => {
          this.fetchData();
        }
      );

     
    }
  }

  loadMorePages = () => {
    const { pageCounter, totalPages } = this.state;
     
      if(totalPages===pageCounter) {

        toast("That's all we've found");
      }
  
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
          status: "resolved"
        }));
      })
      .catch(error => {

        this.setState({status:'rejected'})
        toast(error.message); 

      } );
  };

  render() {
    const { hits,status} = this.state;

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
        <Button loadMorePages={this.loadMorePages} />
        {status==="pending"&& <Loader />}
      </div>
    ) : null;
  }
}
