import React, { Component } from 'react';

import SearchBar from 'components/searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery';

export default class App extends Component {
  

  
  state = {
    searchQuery: '',
    photos:[]
  };



  handleQuery = query => {
    this.setState({ searchQuery: query });
  };

  render() {

    const {searchQuery} = this.state;

    return (
      <div>
        <SearchBar handleQuery={this.handleQuery} />
        <ImageGallery searchQuery={searchQuery}/>
      </div>
    );
  }
}
