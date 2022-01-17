import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../project.css';
import Loading from '../Loading';
import { getUser } from '../../services/userAPI';

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
        <section className="nav">
          <div className="nav__search">
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          </div>
          <div className="nav__favorites">
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          </div>
          <div className="nav__profile">
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </div>
        </section>
      </header>
    );
  }
}

export default Header;
