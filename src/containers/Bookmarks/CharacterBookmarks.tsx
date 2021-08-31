import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';

import { IRootState } from '../../store/store';
import { get } from '../../api/FetchInfo';
import IGenericApiResponse from '../../interfaces/IGenericApiResponse';
import ICharacter from '../../interfaces/ICharacter';
import { imagePlaceHolder } from '../../utils/utils';
import RouteNames from '../../routes/RoutePaths';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import {
  addBookmark,
  hideLocalItem,
  removeBookmark,
  resetBookmarks,
  resetHiddenItems,
} from '../../actions/LocalItems';
import './Bookmarks.scss';

const CharacterBookmarks: React.FC = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewMore = (id: number) => history.push(`/characters/${id}`);

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'CHARACTER' }));
    setCharacters((char) => [...char.filter((c) => c.id !== id)]);
  };

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'CHARACTER' }));

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'CHARACTER' }));
    setCharacters((char) => [...char.filter((c) => c.id !== id)]);
  };

  const handleResetBookmarks = () => {
    dispatch(resetBookmarks());
    setCharacters([]);
  };

  const handleResetHiddenItems = () => {
    dispatch(resetHiddenItems());
    window.location.reload();
  };

  const handleAction = (type: string) => {
    switch (type) {
      case 'BOOKMARK':
        handleResetBookmarks();
        break;
      case 'HIDDEN':
        handleResetHiddenItems();
        break;
      default:
        handleResetBookmarks();
        break;
    }
  };

  useEffect(() => {
    setCharacters([]);
    setLoading(true);
    const charBookmarks = bookmarks.filter((item) => item.type === 'CHARACTER');
    const hiddenChars = hiddenItems.filter((item) => item.type === 'CHARACTER');
    charBookmarks.forEach((bChar, index, arr) => {
      const validateVisibility = hiddenChars.filter((item) => item.id === bChar.id);
      if (validateVisibility.length === 0) {
        const url = `${process.env.REACT_APP_API_URL}v1/public/characters/${
          bChar.id
        }?${queryString.stringify({
          apikey: process.env.REACT_APP_PUBLIC_KEY,
        })}`;
        get<IGenericApiResponse<ICharacter>>(url).then((res) => {
          const { data: charData } = res ?? {};
          const { results: charResult } = charData ?? {};
          setCharacters((chars) => [...chars, charResult[0]]);
          if (index === arr.length - 1) setLoading(false);
        });
      }
      if (index === arr.length - 1) setLoading(false);
    });
    setLoading(false);
  }, []);

  return (
    <>
      <div className='bookmarks'>
        <div className='bookmarks-title'>
          <h1>Character Bookmarks</h1>
        </div>
        <div className='bookmarks-menu'>
          <p>View your bookmarks in:</p>
          <div className='bookmarks-menu__options'>
            <Link type='button' to={RouteNames.COMIC_BOOKMARKS}>
              Comics
            </Link>
            <Link type='button' to={RouteNames.STORIES_BOOKMARKS}>
              Stories
            </Link>
          </div>
        </div>
        <div className='bookmarks-menu'>
          <p>Actions:</p>
          <div className='bookmarks-menu__options'>
            <button
              type='button'
              className='delete-bookmarks'
              onClick={() => {
                handleAction('BOOKMARK');
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
              {'\u00A0'}
              Delete all bookmarks
            </button>
            <button
              type='button'
              className='reset-hidden-items'
              onClick={() => {
                handleAction('HIDDEN');
              }}
            >
              <FontAwesomeIcon icon={faEye} />
              {'\u00A0'}
              Reset hidden items
            </button>
          </div>
        </div>
        {loading && <Loading />}
        <div className='cards'>
          <div className='cards-content'>
            {!loading &&
              characters &&
              characters.map((char) => {
                const inBookmark = bookmarks.find(
                  (item) => item.type === 'CHARACTER' && item.id === char.id,
                );
                return (
                  <Card
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    description={char.description ?? ''}
                    bookmarkClassName={
                      inBookmark
                        ? 'btn btn-action btn-bookmark bookmark-selected'
                        : 'btn btn-action btn-bookmark'
                    }
                    bookmarkIcon={inBookmark ? faBookmarkSolid : faBookmarkRegular}
                    handleViewMore={handleViewMore}
                    handleHideItem={handleHideItem}
                    handleBookmarkAction={inBookmark ? handleRemoveBookmark : handleAddBookmark}
                    imageUrl={
                      char.thumbnail
                        ? `${char.thumbnail.path}/portrait_uncanny.${char.thumbnail.extension}`
                        : imagePlaceHolder
                    }
                  />
                );
              })}
          </div>
        </div>
        {!loading && characters && characters.length <= 0 && (
          <h2 className='error-message'>You don&apos;t have bookmarks in characters</h2>
        )}
      </div>
    </>
  );
};

export default CharacterBookmarks;
