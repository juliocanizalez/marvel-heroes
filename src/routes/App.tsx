import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '../store/store';
import RoutePaths from './RoutePaths';
import Navbar from '../components/Navbar/Navbar';
import Loading from '../components/Loading/Loading';

const Home = lazy(() => import('../containers/Home/Home'));
const Characters = lazy(() => import('../containers/Characters/Characters'));
const Stories = lazy(() => import('../containers/Stories/Stories'));
const Comics = lazy(() => import('../containers/Comics/Comics'));

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Route exact path='/'>
            <Redirect to={RoutePaths.HOME} />
          </Route>
          <Navbar />
          <Switch>
            <Route exact path={RoutePaths.HOME} component={Home} />
            <Route exact path={RoutePaths.COMIC_LIST} component={Comics} />
            <Route exact path={RoutePaths.CHARACTER_LIST} component={Characters} />
            <Route exact path={RoutePaths.STORIES_LIST} component={Stories} />
          </Switch>
        </Suspense>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
