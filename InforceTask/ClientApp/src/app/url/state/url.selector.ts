import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UrlsState } from './url.state';

export const URL_STATE_NAME = 'urls';
const getUrlsState = createFeatureSelector<UrlsState>(URL_STATE_NAME);
export const getUrls = createSelector(getUrlsState, (state) => {
  return state.urls;
});

export const getUrlByOriginalUrl = (originalUrl: string) =>
  createSelector(getUrlsState, (state) => {
    return state.urls.find((url) => url.originalUrl === originalUrl);
  });
