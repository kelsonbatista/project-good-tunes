import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
// import Loading from '../Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    // this.handleFavorites();
  }

  componentWillUnmount() {
    // this.setState(() => {});
  }

  handleFavorites = () => {
    const { track } = this.props;
    getFavoriteSongs().then((savedSongs) => {
      savedSongs.forEach((savedSong) => {
        if (savedSong.trackId === track.trackId) {
          this.setState({ isFavorite: true });
        }
      });
    });
  }

  handleChange = (event) => {
    const checkState = event.target.checked;
    if (checkState) {
      this.setState({ isLoading: true });
      this.handleAddSong();
    } else {
      // this.setState({ isLoading: true });
      // this.handleRemoveSong();
    }
  }

  handleAddSong = () => {
    const { track } = this.props;
    this.setState({ isFavorite: true });
    addSong(track).then(() => {
      this.setState({ isLoading: false });
    });
  }

  handleRemoveSong = () => {
    const { tracks, track } = this.props;
    this.setState({ isLoading: true, isFavorite: false });
    const selectedSong = tracks.filter((music) => music.trackId === track.trackId);
    removeSong(...selectedSong).then(() => this.setState({ isLoading: false }));
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
        onChange={ this.handleChange }
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
        <div id="musicCard">
          {isLoading ? 'Carregando...' : checkboxElement}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  tracks: PropTypes.array,
  track: PropTypes.object,
  trackId: PropTypes.number,
}.isRequired;

export default MusicCard;
