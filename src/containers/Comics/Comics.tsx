/* eslint-disable */

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { debounce } from 'lodash';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';

import { IRootState } from '../../store/store';
import IGenericApiResponse from '../../interfaces/IGenericApiResponse';
import IComic from '../../interfaces/IComic';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import Pagination from '../../components/Pagination/Pagination';
import {
  comicReset,
  setComicAllParams,
  setComicAsyncContent,
  setComicBaseUrl,
  setComicFormat,
  setComicTitle,
} from '../../actions/SearchComic';
import { addBookmark, hideLocalItem, removeBookmark } from '../../actions/LocalItems';
import { getQueryVariable, shortenText, imagePlaceHolder } from '../../utils/utils';
import { get } from '../../api/FetchInfo';
import FormatOptions from '../../mocks/FormatOptions';
import './Comics.scss';

const Comics: React.FC = () => {
  enum QuerysParams {
    Page = 'page',
    Format = 'format',
    Title = 'title',
  }

  const history = useHistory();
  const dispatch = useDispatch();
  const {
    url,
    limit,
    format,
    title,
    loading,
    error,
    data: genericResponse,
  } = useSelector((state: IRootState) => state.searchComic);
  const { hiddenItems, bookmarks } = useSelector((state: IRootState) => state.localItems);

  const { data } = genericResponse ?? {};
  const { results } = data ?? {};
  const [comics, setComics] = useState<IComic[] | null>(null);

  const changeUrlParams = (newPage: number, newFormat: string, newTitle: string) => {
    history.push(
      `?${queryString.stringify({
        page: newPage,
        format: newFormat === '' ? undefined : newFormat,
        title: newTitle === '' ? undefined : newTitle,
      })}`,
    );
  };

  const handleChangePage = (newPage: number) => {
    window.scrollTo({ top: 300 });
    changeUrlParams(newPage, format, title);
  };

  const debouncedTitleChange = useCallback(
    debounce((title: string, format: string) => changeUrlParams(1, format, title), 1000),
    [],
  );

  const handleTitleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setComicTitle(target.value));
    debouncedTitleChange(target.value, format);
  };

  const handleFormatChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setComicFormat(target.value));

    changeUrlParams(1, target.value, title);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => e.preventDefault();

  const handleViewMore = (id: number) => history.push(`comics/${id}`);

  const handleHideItem = (id: number) => dispatch(hideLocalItem({ id, type: 'COMIC' }));

  const handleAddBookmark = (id: number) => dispatch(addBookmark({ id, type: 'COMIC' }));

  const handleRemoveBookmark = (id: number) => dispatch(removeBookmark({ id, type: 'COMIC' }));

  useEffect(() => {
    dispatch(setComicBaseUrl(`${process.env.REACT_APP_API_URL}v1/public/comics`));

    return () => {
      dispatch(comicReset());
    };
  }, []);

  useEffect(() => {
    const newPage = getQueryVariable(QuerysParams.Page) ? +getQueryVariable(QuerysParams.Page) : 1;

    const newFormat = getQueryVariable(QuerysParams.Format)
      ? decodeURI(getQueryVariable(QuerysParams.Format))
      : '';

    const newTitle = getQueryVariable(QuerysParams.Title)
      ? decodeURI(getQueryVariable(QuerysParams.Title))
      : '';

    const newOffset = Math.ceil((newPage - 1) * limit);

    dispatch(setComicAllParams(newOffset, newFormat, newTitle));
  }, [history.location, limit]);

  useEffect(() => {
    if (url) {
      dispatch(setComicAsyncContent(true, '', null));
      get<IGenericApiResponse<IComic>>(url)
        .then((res) => {
          dispatch(setComicAsyncContent(false, '', res));
        })
        .catch((err) => {
          dispatch(setComicAsyncContent(false, 'Could not load comics', null));
        });
    }
  }, [url]);

  useEffect(() => {
    if (results) {
      const hiddenComics = hiddenItems.filter((item) => item.type === 'COMIC');
      setComics(
        results.filter((char) => {
          const hiddenComicFilter = hiddenComics.filter((item) => item.id === char.id);
          if (hiddenComicFilter.length > 0) {
            return false;
          }
          return true;
        }),
      );
    }
  }, [results, hiddenItems]);

  return (
    <div className='comics'>
      <div className='comics-page__title'>
        <h1>Comics</h1>
      </div>
      <div className='comics-search'>
        <form onSubmit={handleSubmit}>
          <h3 className='comics-search__title'>Search your comic</h3>
          <div className='search'>
            <div className='search-header'>Title</div>
            <div className='search-value'>
              <input
                type='text'
                name='title'
                placeholder="Comic's title"
                autoComplete='off'
                className='search-input'
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className='search-value'>
              <select className='search-value__select' value={format} onChange={handleFormatChange}>
                <option value=''>Select a format</option>
                {FormatOptions.map((format) => (
                  <option key={format.value} value={format.value}>
                    {shortenText(format.name, 20)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
      {loading && <Loading />}
      {error && <h2 className='error-message'>Could not load comics 😓</h2>}
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
      {results && results.length <= 0 && <h2 className='error-message'>Comics not found 😮</h2>}
      {!loading && results && results.length > 0 && comics && comics.length <= 0 && (
        <h2 className='error-message'>Comics on this page are hidden 🤐</h2>
      )}
      {!loading && !error && results && genericResponse && results.length > 0 && (
        <Pagination genericResponse={genericResponse} onChange={handleChangePage} />
      )}
    </div>
  );
};

export default Comics;
