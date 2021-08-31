import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkSolid, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import IComic from '../../interfaces/IComic';
import { IRootState } from '../../store/store';
import { get } from '../../api/FetchInfo';
import IGenericApiResponse from '../../interfaces/IGenericApiResponse';
import { imagePlaceHolder } from '../../utils/utils';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import RouteNames from '../../routes/RoutePaths';
import {
  addBookmark,
  hideLocalItem,
  removeBookmark,
  resetBookmarks,
  resetHiddenItems,
} from '../../actions/LocalItems';
import './Bookmarks.scss';

const ComicBookmarks: React.FC = () => {
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);
  const history = useHistory();
  const dispatch = useDispatch();

  const [comics, setComics] = useState<IComic[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewMore = (id: number) => history.push(`/comics/${id}`);

  const handleHideItem = (id: number) => {
    dispatch(hideLocalItem({ id, type: 'COMIC' }));
    setComics((char) => [...char.filter((c) => c.id !== id)]);
  };

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'COMIC' }));

  const handleRemoveBookmark = (id: number) => {
    dispatch(removeBookmark({ id, type: 'COMIC' }));
    setComics((char) => [...char.filter((c) => c.id !== id)]);
  };

  const handleResetBookmarks = () => {
    dispatch(resetBookmarks());
    setComics([]);
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
    setComics([]);
    setLoading(true);
    const comicBookmarks = bookmarks.filter((item) => item.type === 'COMIC');
    const hiddenComics = hiddenItems.filter((item) => item.type === 'COMIC');
    comicBookmarks.forEach((bComic, index, arr) => {
      const validateVisibility = hiddenComics.filter((item) => item.id === bComic.id);
      if (validateVisibility.length === 0) {
        const url = `${process.env.REACT_APP_API_URL}v1/public/comics/${
          bComic.id
        }?${queryString.stringify({
          apikey: process.env.REACT_APP_PUBLIC_KEY,
        })}`;
        get<IGenericApiResponse<IComic>>(url).then((res) => {
          const { data: comicData } = res ?? {};
          const { results: comicResult } = comicData ?? {};
          setComics((c) => [...c, comicResult[0]]);
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
          <h1>Comic Bookmarks</h1>
        </div>
        <div className='bookmarks-menu'>
          <p>View your bookmarks in:</p>
          <div className='bookmarks-menu__options'>
            <Link type='button' to={RouteNames.CHARACTER_BOOKMARKS}>
              Characters
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
              comics &&
              comics.map((comic) => {
                const inBookmark = bookmarks.find(
                  (item) => item.type === 'COMIC' && item.id === comic.id,
                );
                return (
                  <Card
                    key={comic.id}
                    id={comic.id}
                    name={comic.title}
                    description={comic.description ?? ''}
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
                      comic.thumbnail
                        ? `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`
                        : imagePlaceHolder
                    }
                  />
                );
              })}
          </div>
        </div>
        {!loading && comics && comics.length <= 0 && (
          <h2 className='error-message'>You don&apos;t have bookmarks in comics</h2>
        )}
      </div>
    </>
  );
};

export default ComicBookmarks;
