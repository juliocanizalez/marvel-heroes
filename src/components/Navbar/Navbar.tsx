import React, { useState, useCallback } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Home, Characters, Bookmarks, Stories, Comics } from './MenuItems';

const Navbar: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const toggleMenu = useCallback(() => {
    setIsClicked((current) => !current);
  }, [setIsClicked]);

  return (
    <nav className='navbar'>
      <Link to={Home.URL}>
        <img src='' alt='Marvel Logo' className='navbar-logo' />
      </Link>
      <div className='navbar-icon' onClick={toggleMenu}>
        <i className={isClicked ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={isClicked ? 'navbar-menu show' : 'navbar-menu'}>
        <li>
          <NavLink
            to={Home.URL}
            className='navbar-menu__link'
            activeClassName='navbar-menu__link--active'
          >
            {Home.TITLE}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={Comics.URL}
            className='navbar-menu__link'
            activeClassName='navbar-menu__link--active'
          >
            {Comics.TITLE}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={Characters.URL}
            className='navbar-menu__link'
            activeClassName='navbar-menu__link--active'
          >
            {Characters.TITLE}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={Stories.URL}
            className='navbar-menu__link'
            activeClassName='navbar-menu__link--active'
          >
            {Stories.TITLE}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={Bookmarks.URL}
            className='navbar-menu__link'
            activeClassName='navbar-menu__link--active'
          >
            {Bookmarks.TITLE}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
