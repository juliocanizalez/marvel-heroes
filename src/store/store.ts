/* eslint-disable no-underscore-dangle */
import { createStore, combineReducers, StoreEnhancer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import SearchReducer from '../reducers/search/SearchReducer';
import SearchComicReducer from '../reducers/searchComic/SearchComicReducer';
import ViewItemReducer from '../reducers/viewItem/ViewItemReducer';
import LocalItemsReducer from '../reducers/localItems/LocalItemsReducer';

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};

const isReduxDevtoolsExtenstionExist = (
  arg: Window | WindowWithDevTools,
): arg is WindowWithDevTools => '__REDUX_DEVTOOLS_EXTENSION__' in arg;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['localItems'],
};

const rootReducer = combineReducers({
  search: SearchReducer,
  searchComic: SearchComicReducer,
  viewItem: ViewItemReducer,
  localItems: LocalItemsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  isReduxDevtoolsExtenstionExist(window) ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined,
);

export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;

export default store;
