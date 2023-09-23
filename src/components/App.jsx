import React, { Component } from 'react';
import css from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';

import imageAPI from './utilites/imagesApi';
import SearchBar from 'components/searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import Loader from './loader/loader';
import Button from './button/button';

export default class App extends Component {
  state = {
    query: '',
    hits: [],
    totalPages: 0,
    pageCounter: 0,
    status: 'idle',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { query, pageCounter } = this.state;
    const { query: prevQuery, pageCounter: prevPageCounter } = prevState;

    if (query !== prevQuery || pageCounter !== prevPageCounter) {
      this.setState({ status: 'pending' }, () => {
        imageAPI(query, pageCounter)
          .then(data => {
            this.setState(prevState => ({
              hits: [...prevState.hits, ...data.hits],
              totalPages: Math.ceil(data.totalHits / 12),
              status: 'resolved',
            }));
          })
          .catch(error => {
            this.setState({ status: 'rejected' });
            toast(error.message);
          });
      });
    }
  };

  handleQuery = query => {
    this.setState({ query: query, pageCounter: 1, hits: [] });
  };

  loadMorePages = () => {
    const { pageCounter, totalPages } = this.state;
    if (totalPages > pageCounter) {
      this.setState(
        prevState => ({
          pageCounter: prevState.pageCounter + 1,
          status: 'pending',
        }),
        () => {
          if (this.state.pageCounter === this.state.totalPages) {
            toast("This is all we've found!");
          }
        }
      );
    }
  };

  render() {
    const { query, hits, status, pageCounter, totalPages } = this.state;

    if ((status === 'idle')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={this.handleQuery} />
        </div>
      );
    }

    if ((status  ==='pending')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={this.handleQuery} />
          <ImageGallery query={query} hits={hits} />
          <Loader />
          {pageCounter !== totalPages ? (
            <Button loadMorePages={this.loadMorePages} />
          ) : null}

          <ToastContainer
            position="top-center"
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      );
    }

    if ((status === 'resolved')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={this.handleQuery} />
          <ImageGallery query={query} hits={hits} />
          {pageCounter !== totalPages ? (
            <Button loadMorePages={this.loadMorePages} />
          ) : null}
        </div>
      );
    }
    if ((status === 'rejected')) {
      return (
        <div className={css.app}>
          <SearchBar handleQuery={this.handleQuery} />
          <h1>Something went wrong</h1>

          <ToastContainer
            position="top-center"
            autoClose={3000}
            limit={1}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      );
    }
  }
}
