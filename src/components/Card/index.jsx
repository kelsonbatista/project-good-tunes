import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const {
      cardImage,
      collectionId,
      cardCollection,
      cardArtist,
    } = this.props;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="card">
          <img className="card__image" src={ cardImage } alt={ cardArtist } />
          <p className="card__collection">{ cardCollection }</p>
          <p className="card__artist">{ cardArtist }</p>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  cardImage: PropTypes.string,
  cardCollection: PropTypes.string,
  cardArtist: PropTypes.string,
}.isRequired;

export default Card;
