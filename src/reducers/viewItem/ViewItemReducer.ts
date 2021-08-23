/* eslint no-case-declarations:0 */
import IViewItemState from './IViewItemState';
import ViewItemActions from './ViewItemActions';

const initState = {
  loading: false,
  error: '',
  data: null,
};

const ViewItemReducer = (state: IViewItemState = initState, action: ViewItemActions) => {
  switch (action.type) {
    case 'SET_LOADING_VIEW_ITEM':
      return {
        ...state,
        loading: action.payload.loading,
      };

    case 'SET_ERROR_VIEW_ITEM':
      return {
        ...state,
        error: action.payload.error,
      };

    case 'SET_DATA_VIEW_ITEM':
      return {
        ...state,
        data: action.payload.data,
      };

    case 'SET_ASYNC_CONTENT_VIEW_ITEM':
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
        data: action.payload.data,
      };

    case 'RESET_VIEW_ITEM':
      return {
        ...initState,
      };

    default:
      return state;
  }
};

export default ViewItemReducer;
