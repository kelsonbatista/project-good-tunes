import React, { Component } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      isButtonDisabled: true,
    };
  }

  handleSearchChange = ({ target }) => {
    const { name, value } = target;
    const MIN_NAME_LENGTH = 2;
    this.setState({
      [name]: value,
    }, () => this.enableButton(MIN_NAME_LENGTH, value));
  }

  handleSearchSubmit = () => {
    const { search } = this.state;
    console.log(`Search: ${search}`);
  }

  enableButton = (inputLength, value) => {
    if (value.length >= inputLength) {
      this.setState({ isButtonDisabled: false });
    }
  }

  render() {
    const { search, isButtonDisabled } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <h1>Search</h1>
        </div>
        <div className="search__bar">
          <Input
            label=""
            id="search-artist-input"
            type="text"
            name="search"
            dataTestid="search-artist-input"
            classElement="search__input"
            classDiv="search__input-div"
            maxLength="200"
            placeholder="Nome do artista"
            disabled=""
            value={ search }
            required={ false }
            onChange={ this.handleSearchChange }
          />

          <Button
            label="Pesquisar"
            id="search-submit-button"
            type="submit"
            name="search-submit-button"
            dataTestid="search-artist-button"
            classElement="search__button"
            classDiv="search__button-div"
            disabled={ isButtonDisabled }
            param=""
            onClick={ this.handleSearchSubmit }
          />
        </div>
      </>
    );
  }
}

export default Search;
