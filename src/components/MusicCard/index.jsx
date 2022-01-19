import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import { addSong } from '../../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  handleAddSong = ({ target }) => {
    const { data } = this.props;
    const isChecked = target.checked;
    this.setState({ isFavorite: isChecked, isLoading: true });
    this.fetchFavoriteSongsAPI(data);
  }

  fetchFavoriteSongsAPI = (data) => {
    try {
      addSong({ ...data });
      this.setState({ isLoading: false });
    } catch (error) {
      return (`Error found: ${error}`);
    }
  }

  render() {
    const {
      isFavorite,
      isLoading,
    } = this.state;

    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const checkboxElement = (
      <Input
        label="Favorita"
        id="favorites"
        type="checkbox"
        name="favorites"
        dataTestid={ `checkbox-music-${trackId}` }
        classElement="music__favorites"
        classDiv="music__favorites-div"
        checked={ isFavorite }
        required={ false }
        onChange={ this.handleAddSong }
      />
    );

    return (
      <div className="music">
        <div className="music__name">
          <p>{trackName}</p>
        </div>
        <div className="music__audio">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </div>
        <div>
          {isLoading ? 'Carregando...' : checkboxElement}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  data: PropTypes.array,
}.isRequired;

export default MusicCard;
