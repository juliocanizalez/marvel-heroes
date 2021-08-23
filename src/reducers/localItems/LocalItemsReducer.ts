import ILocalItemsState from './ILocalItemsState';
import LocalItemsActions from './LocalItemsActions';

const initState = {
  hiddenItems: [],
  bookmarks: [],
};

const LocalItemsReducer = (state: ILocalItemsState = initState, action: LocalItemsActions) => {
  switch (action.type) {
    case 'HIDE_LOCAL_ITEM':
      return {
        ...state,
        hiddenItems: [...state.hiddenItems, action.payload.item],
      };

    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload.item],
      };
    /* eslint no-case-declarations:0 */
    case 'REMOVE_BOOKMARK':
      const { item } = action.payload;
      const newBookmarks = state.bookmarks.filter(
        (bookM) => !(bookM.id === item.id && bookM.type === item.type),
      );
      return {
        ...state,
        bookmarks: [...newBookmarks],
      };

    case 'RESET_BOOKMARKS':
      return {
        ...state,
        bookmarks: [...initState.bookmarks],
      };

    case 'RESET_HIDDEN_ITEMS':
      return {
        ...state,
        hiddenItems: [...initState.hiddenItems],
      };

    case 'RESET_LOCAL_ITEMS':
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default LocalItemsReducer;
