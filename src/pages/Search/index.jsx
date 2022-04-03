import React, { Component } from 'react';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      searchResult: [],
      artist: '',
      isButtonDisabled: true,
      isLoading: false,
      isNotFound: false,
    };
  }

  handleSearchChange = ({ target }) => {
    const { name, value } = target;
    const MIN_NAME_LENGTH = 2;
    this.setState({
      [name]: value,
    }, () => this.enableButton(MIN_NAME_LENGTH, value));
  }

  enableButton = (inputLength, value) => {
    if (value.length >= inputLength) {
      this.setState({ isButtonDisabled: false });
    }
  }

  handleSearchSubmit = () => {
    const { searchQuery } = this.state;
    this.fetchSearchAlbum(searchQuery);
    this.setState({ artist: searchQuery, isLoading: true });
    this.resetState();
  }

  fetchSearchAlbum = async (artist) => {
    try {
      const data = await searchAlbumsAPI(artist);
      this.setState({ searchResult: data, isLoading: false });
      if (data.length === 0 || !data) {
        this.setState({ isNotFound: true });
      }
      // console.log(data);
      // const { searchResult } = this.state;
      // console.log(`resusltado ==> ${searchResult}`);
    } catch (error) {
      return `Error found: ${error}`;
    }
  }

  resetState = () => {
    this.setState({
      searchQuery: '',
    });
  }

  render() {
    const {
      searchQuery,
      searchResult,
      artist,
      isButtonDisabled,
      isLoading,
      isNotFound,
    } = this.state;

    const MAX_CHAR_COLLECTION = 22;
    const MAX_CHAR_ARTIST = 22;
    const NOT_FOUND = 'Nenhum álbum foi encontrado';

    const COLLECTIONS = (
      <div className="search__list">
        {searchResult.map((card, index) => (
          <div key={ index }>
            {/* limitar nome: ref: https://stackoverflow.com/questions/4700226/i-want-to-truncate-a-text-or-line-with-ellipsis-using-javascript */}
            <Card
              cardImage={ card.artworkUrl100 }
              collectionId={ card.collectionId }
              cardCollection={
                (card.collectionName).length > MAX_CHAR_COLLECTION
                  ? (`${(card.collectionName).substring(0, MAX_CHAR_COLLECTION)}...`)
                  : (card.collectionName)
              }
              cardArtist={
                (card.artistName).length > MAX_CHAR_ARTIST
                  ? (`${(card.artistName).substring(0, MAX_CHAR_ARTIST)}...`)
                  : (card.artistName)
              }
            />
          </div>
        ))}
      </div>
    );

    return (
      <div className="page">
        <Header />
        <div className="search" data-testid="page-search">
          { isLoading && <Loading /> }
          <div className="search__bar">
            <Input
              label=""
              id="search-artist-input"
              type="text"
              name="searchQuery"
              dataTestid="search-artist-input"
              classElement={ isLoading ? 'search__input-none' : 'search__input' }
              classDiv="search__input-div"
              maxLength="200"
              placeholder="Nome do artista"
              disabled=""
              value={ searchQuery }
              required={ false }
              onChange={ this.handleSearchChange }
            />

            <Button
              label="Pesquisar"
              id="search-submit-button"
              type="submit"
              name="search-submit-button"
              dataTestid="search-artist-button"
              classElement={ isLoading ? 'search__button-none' : 'search__button' }
              classDiv="search__button-div"
              disabled={ isButtonDisabled }
              param=""
              onClick={ this.handleSearchSubmit }
            />
          </div>
        </div>
        <div className="search__result">
          <div className="search__title">
            {`Resultado de álbuns de: ${artist}`}
          </div>
          {(isNotFound ? NOT_FOUND : COLLECTIONS)}
        </div>
      </div>
    );
  }
}

export default Search;
