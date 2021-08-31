import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '../store/store';
import RoutePaths from './RoutePaths';
import Navbar from '../components/Navbar/Navbar';
import Loading from '../components/Loading/Loading';
import Footer from '../components/Footer/Footer';
import NotFound from '../containers/NotFound/NotFound';

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

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Route exact path='/'>
            <Redirect to={RoutePaths.HOME} />
          </Route>
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
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Footer />
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
