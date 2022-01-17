import React, { Component } from 'react';
import { getUser } from '../../services/userAPI';
import '../../project.css';
import Loading from '../Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchUserApi();
  }

  fetchUserApi = async () => {
    const { name } = await getUser();
    this.setState({ name, isLoading: false });
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <section className="header">
          <div className="header__left">
            <h1>Header</h1>
          </div>
          <div className="header__right">
            <p className="header__user" data-testid="header-user-name">
              {(isLoading ? <Loading /> : name)}
            </p>
          </div>
        </section>
      </header>
    );
  }
}

export default Header;
