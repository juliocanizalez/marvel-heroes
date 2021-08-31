/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */
import React, { lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryHistory } from 'history';

import store from '../store/store';
import RoutePaths from '../routes/RoutePaths';

const Home = lazy(() => import('../containers/Home/Home'));
const Characters = lazy(() => import('../containers/Characters/Characters'));
const Stories = lazy(() => import('../containers/Stories/Stories'));
const Comics = lazy(() => import('../containers/Comics/Comics'));
const CharactersBookmarks = lazy(() => import('../containers/Bookmarks/CharacterBookmarks'));
const StoriesBookmarks = lazy(() => import('../containers/Bookmarks/StoriesBookmarks'));
const ComicsBookmarks = lazy(() => import('../containers/Bookmarks/ComicBookmarks'));
const ComicPage = lazy(() => import('../containers/Comics/ViewComic'));
const ViewCharacter = lazy(() => import('../containers/Characters/ViewCharacter'));
const ViewStory = lazy(() => import('../containers/Stories/ViewStory'));

const renderWithCustomHistory = (history: MemoryHistory) => {
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path={RoutePaths.HOME} component={Home} />
          <Route exact path={RoutePaths.COMIC_LIST} component={Comics} />
          <Route exact path={RoutePaths.CHARACTER_LIST} component={Characters} />
          <Route exact path={RoutePaths.STORIES_LIST} component={Stories} />
          <Route exact path={RoutePaths.CHARACTER_BOOKMARKS} component={CharactersBookmarks} />
          <Route exact path={RoutePaths.STORIES_BOOKMARKS} component={StoriesBookmarks} />
          <Route exact path={RoutePaths.COMIC_BOOKMARKS} component={ComicsBookmarks} />
          <Route exact path={RoutePaths.COMIC_DETAILS} component={ComicPage} />
          <Route exact path={RoutePaths.CHARACTER_DETAILS} component={ViewCharacter} />
          <Route exact path={RoutePaths.STORIES_DETAILS} component={ViewStory} />
        </Switch>
      </Router>
    </Provider>,
  );
};

export { renderWithCustomHistory };
