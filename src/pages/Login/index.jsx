import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { createUser } from '../../services/userAPI';
import logo from '../../assets/images/logo.gif';

class Login extends Component {
  constructor() {
    super();
    // this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
    // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    // this.enableButton = this.enableButton.bind(this);
    // this.fetchUserAPI = this.fetchUserAPI.bind(this);

    this.state = {
      name: '',
      isButtonDisabled: true,
      isLoading: false,
      // isRedirect: false,
    };
  }

  redirectRoute = () => {
    const { history } = this.props;
    history.push('/search');
  }

  handleLoginInputChange = ({ target }) => {
    const { name, value } = target;
    const MIN_NAME_LENGTH = 3;
    this.setState({
      [name]: value,
    }, () => this.enableButton(MIN_NAME_LENGTH, value));
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.fetchUserAPI(name);
    this.setState({ isLoading: true });
  }

  /* Source: Slack Vitor Correa / Suporte Rod */
  fetchUserAPI = async (newUser) => {
    await createUser({ name: newUser });
    this.redirectRoute();
    // this.setState({ isRedirect: true });
  }

  enableButton = (inputLength, value) => {
    if (value.length >= inputLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  render() {
    const isRequired = true;
    const {
      name,
      isButtonDisabled,
      isLoading,
      // isRedirect,
    } = this.state;

    // if (isRedirect) {
    //   return <Redirect to="/search" />;
    // }

    return (
      <div className="login" data-testid="page-login">
        <img src={ logo } alt="Logo" />
        <form onSubmit={ this.handleLoginSubmit }>
          <Input
            label=""
            id="login-name-input"
            type="text"
            name="name"
            dataTestid="login-name-input"
            classElement="login__input"
            classDiv="login__input-div"
            maxLength="50"
            placeholder="Type your name"
            disabled=""
            value={ name }
            required={ isRequired }
            onChange={ this.handleLoginInputChange }
          />

          <Button
            label="Entrar"
            id="login-submit-button"
            type="submit"
            name="login-submit-button"
            dataTestid="login-submit-button"
            classElement="login__button"
            classDiv="login__button-div"
            disabled={ isButtonDisabled }
            param=""
            onClick={ this.handleLoginSubmit }
          />
        </form>
        {isLoading && <Loading />}
        {/* {isRedirect && <Redirect to="/search" />} */}
      </div>
    );
  }
}

/* erro no history não reconhece. Incluir PropTypes - Ajuda Giovanni */
Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Login;
