import React, { Component } from 'react';
import css from './searchBar.module.css';
import { throttle } from 'lodash';
import 'react-toastify/dist/ReactToastify.css';

import {FcGoogle} from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  
  };
  handleInput(e) {
    this.setState({ searchQuery: e.target.value });
  }
  handleSubmit = throttle((e) =>  {
    e.preventDefault();
    const { searchQuery} = this.state;

    if (searchQuery.trim() === '') {
  
      toast("Search query can't be empty!");

      return;
    }
    this.props.handleQuery(searchQuery.toLowerCase().trim());
    this.setState({ searchQuery: '' });
  },300);
    

  render() {
    return (
      <header className={css.header}>
        <form className={css.searchForm} onSubmit={e => this.handleSubmit(e)}>
          <button type="submit" className={css.searchForm_button}>
          <FcGoogle size="35"/>
          </button>

          <input
            className={css.searchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={e => this.handleInput(e)}
          />
        </form>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </header>
    );
  }
}
