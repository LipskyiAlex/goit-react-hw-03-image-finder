import React, { Component } from 'react';

import SearchBar from 'components/searchbar/searchbar';
import ImageGallery from './imageGallery/imageGallery'

export default class App extends Component {

   static KEY = '38590666-b4e4facc0390580085af70521Q'
   baseURL = `https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12` 

  state = {
   
    searchQuery:""

  };

  componentDidUpdate() {

    fetch(`https://pixabay.com/api/?q=${this.state.searchQuery}&page=1&key=${App.KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
        
         if(response.ok) {

          return response.json()
         } 
     
          throw new Error ("Something went wrong. Please contact us")
          
          }) 
    .then(data => console.log(data))
     .catch(error => console.log(error.message));

    }
  
  handleQuery = (query) => {

    this.setState({searchQuery:query})

  }
    
  render() {
    return (
      <div>
        <SearchBar handleQuery={this.handleQuery}/>
        <ImageGallery/>
        React homework template
      </div>
    );
  }
}
