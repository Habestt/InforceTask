import {
  loadUrlsSuccess,
  deleteUrlSuccess,
  createUrlSuccess,
} from './url.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './url.state';

const _urlsReducer = createReducer(
  initialState,
  on(loadUrlsSuccess, (state, action) => {
    return {
      ...state,
      urls: action.urls,
    };
  }),

  on(createUrlSuccess, (state, action) => {
    return {
      ...state,
    };
  }),

  on(deleteUrlSuccess, (state, { id }) => {
    const updatedUrls = state.urls.filter((url) => {
      return url.id !== id;
    });

    return {
      ...state,
      urls: updatedUrls,
    };
  })
);

export function urlsReducer(state: any, action: any) {
  return _urlsReducer(state, action);
}
