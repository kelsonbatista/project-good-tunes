import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../project.css';
// import Loading from '../Loading';
import { getUser } from '../../services/userAPI';
import logo from '../../assets/images/logo1.png';
import user from '../../assets/images/user.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchUserApi();
  }

  componentWillUnmount() {
    this.setState({ isLoading: false });
  }

  fetchUserApi = () => {
    this.setState({ isLoading: true });
    getUser().then(({ name }) => {
      this.setState({ username: name, isLoading: false });
    });
    // this.setState({ username: user.name });
  }

  render() {
    const { username, isLoading } = this.state;
    return (
      <div className="header1">
        <div className="header__div">
          <div className="header__left">
            <img src={ logo } alt="Logo" className="header__logo" />
          </div>
          <div className="nav">
            <div className="nav__search">
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            </div>
            <div className="nav__favorites">
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            </div>
            <div className="nav__profile">
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </div>
          </div>
          <div className="header__right">
            <img src={ user } alt="Avatar" className="avatar" />
            <div className="header__user" data-testid="header-user-name">
              {(isLoading ? 'Carregando...' : username)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
