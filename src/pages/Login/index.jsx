import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { createUser } from '../../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.enableButton = this.enableButton.bind(this);

    this.state = {
      name: '',
      isButtonDisabled: true,
      isLoading: false,
      isRedirect: false,
    };
  }

  componentDidMount() {
    this.fetchUserAPI();
  }

  handleLoginInputChange({ target }) {
    const { name, value } = target;
    const MIN_NAME_LENGTH = 3;
    this.setState({
      [name]: value,
    }, () => this.enableButton(MIN_NAME_LENGTH, value));
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    this.fetchUserAPI(name);
    this.setState({ isLoading: true, isRedirect: true });
  }

  /* Source: Slack Vitor Correa */
  fetchUserAPI = async (newUser) => {
    await createUser(newUser);
  }

  enableButton(inputLength, value) {
    if (value.length >= inputLength) {
      this.setState({ isButtonDisabled: false });
    }
  }

  render() {
    const isRequired = true;
    const {
      name,
      isButtonDisabled,
      isLoading,
      isRedirect,
    } = this.state;

    return (
      <div className="login" data-testid="page-login">
        <h1>Login</h1>
        <form onSubmit={ this.handleLoginSubmit }>
          <Input
            label="Name"
            id="login-name-input"
            type="text"
            name="name"
            dataTestid="login-name-input"
            classElement="login__input"
            classDiv="login__input-div"
            maxLength="50"
            placeholder=""
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
        {isRedirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
