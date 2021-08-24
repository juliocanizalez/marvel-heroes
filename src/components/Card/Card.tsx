import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { shortenText } from '../../utils/utils';
import './Card.scss';

interface ICard {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  bookmarkClassName: string;
  bookmarkIcon: IconDefinition;
  handleViewMore(id: number): void;
  handleHideItem(id: number): void;
  handleBookmarkAction(id: number): void;
}

const Card: React.FC<ICard> = ({
  id,
  name,
  description,
  imageUrl,
  bookmarkClassName,
  bookmarkIcon,
  handleViewMore,
  handleHideItem,
  handleBookmarkAction,
}) => (
  <div
    className='card'
    style={{
      backgroundImage: `url(${imageUrl})`,
    }}
  >
    <div className='content'>
      <h2 className='title'>{shortenText(name, 20)}</h2>
      <p className='copy'>{shortenText(description, 50)}</p>
      <div className='card-actions'>
        <button type='button' className='btn btn-more' onClick={() => handleViewMore(id)}>
          View More
        </button>
        <button
          type='button'
          className='btn btn-action btn-hide'
          onClick={() => handleHideItem(id)}
        >
          <FontAwesomeIcon icon={faEyeSlash} />
        </button>
        <button
          type='button'
          className={bookmarkClassName}
          onClick={() => handleBookmarkAction(id)}
        >
          <FontAwesomeIcon icon={bookmarkIcon} />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
