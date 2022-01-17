import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../../components/Header';

class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1>Search</h1>
        </div>
      </>
    );
  }
}

export default Search;
