import React, { Component } from 'react';

import SearchBar from 'components/searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';
import ImageGalleryItem from './imageGalleryItem/imageGalleryItem';
import Button from './button/button';
import Loader from './loader/loader';


export default class App extends Component {
  
  
  state = {
    searchQuery: '',
    totalPages:0,
  };

  handleQuery = query => {
    this.setState({ searchQuery: query });
  };

  render() {

    const {searchQuery} = this.state;

    return (
      <div className="app">
        <SearchBar handleQuery={this.handleQuery} />
        <ImageGallery searchQuery={searchQuery}/>
       
      </div>
    );
  }
}
