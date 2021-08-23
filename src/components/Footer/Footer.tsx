import React from 'react';
import { Link } from 'react-router-dom';

import RoutePaths from '../../routes/RoutePaths';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-map'>
        <h3 className='footer-map__title'>Site Map</h3>
        <div className='footer-map__links'>
          <Link to={RoutePaths.HOME}>Home</Link>
          <Link to={RoutePaths.COMIC_LIST}>Comics</Link>
          <Link to={RoutePaths.CHARACTER_LIST}>Characters</Link>
          <Link to={RoutePaths.STORIES_LIST}>Stories</Link>
          <Link to={RoutePaths.CHARACTER_BOOKMARKS}>Bookmarks</Link>
        </div>
      </div>
      <div className='footer-social'>
        <a href='https://www.facebook.com/Marvel' target='_blank' rel='noreferrer'>
          <i className='fab fa-facebook-f' />
        </a>
        <a href='https://twitter.com/MarvelLATAM' target='_blank' rel='noreferrer'>
          <i className='fab fa-twitter' />
        </a>
        <a href='https://www.marvel.com/' target='_blank' rel='noreferrer'>
          <i className='fas fa-window-maximize' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
