import React, { Component } from 'react';
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import MusicCard from '../../components/MusicCard';
import getMusics from '../../services/musicsAPI';

/* handle params - Ref: https://karoldabrowski.com/blog/getting-parameters-from-url-in-a-react-application/
ler propriedade do obj no estado - https://stackoverflow.com/questions/70756030/react-unable-to-access-state-property-not-found-solution/70756412#70756412 */

class Album extends Component {
  constructor() {
    super();

    this.state = {
      collection: [],
    };
  }

  componentDidMount() {
    this.fetchSearchAlbum();
  }

  fetchSearchAlbum = async () => {
    try {
      const { match: { params: { id } } } = this.props;
      const data = await getMusics(id);
      this.setState({ collection: data });
    } catch (error) {
      return (`Error found: ${error}`);
    }
  }

  render() {
    const { collection } = this.state;
    if (collection.length === 0) {
      return null;
    }

    const musics = collection.slice(1);

    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
        </div>
        <div className="album__div">
          <div className="album__cover">
            <img src={ collection[0].artworkUrl100 } alt="" />
            <p data-testid="album-name">{collection[0].collectionName}</p>
            <p data-testid="artist-name">{collection[0].artistName}</p>
          </div>
          <div className="album__musics">
            {/* skip first array - slice - https://stackoverflow.com/questions/42970515/javascript-built-in-methods-how-to-skip-the-first-iteration */}
            {musics.map(({ trackName, previewUrl, trackId }, index) => (
              <MusicCard
                key={ index }
                data={ collection }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
              />
            ))}
          </div>
        </div>
      </>

    );
  }
}

Album.propTypes = {
  id: PropTypes.number,
}.isRequired;

export default Album;
