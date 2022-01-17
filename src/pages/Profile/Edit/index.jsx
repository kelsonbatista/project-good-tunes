import React, { Component } from 'react';
import Header from '../../../components/Header';

class EditProfile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Edit Profile</h1>
        </div>
      </>
    );
  }
}

export default EditProfile;
