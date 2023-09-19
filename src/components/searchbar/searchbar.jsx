import React, { Component } from 'react';
import css from './searchBar.modules.css'

export default class SearchBar extends Component {
    
     state = {

        searchQuery:"",

     };


  handleInput (e) {

      this.setState({searchQuery:e.target.value})

  }

  handleSubmit (e) {
    e.preventDefault();
       const {searchQuery} = this.state;

      if(searchQuery.trim() === '') {

        return "Search query can't be empty!"   //! ADD react notify!
      } 

      this.props.handleQuery(searchQuery.toLowerCase().trim())
  }
    render() {

        return (

            <header className="searchbar">
  <form className="SearchForm" onSubmit={(e) => this.handleSubmit(e)}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
    </button>

    <input
      className="SearchForm-input"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={(e) => this.handleInput(e)}
    />
  </form>
</header>
        )
    }
}