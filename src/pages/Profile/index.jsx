import React, { Component } from 'react';
import Header from '../../components/Header';
// import PropTypes from 'prop-types';

class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <h1>Profile</h1>
        </div>
      </>
    );
  }
}

export default Profile;
