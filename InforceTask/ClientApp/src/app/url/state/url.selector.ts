import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UrlsState } from './url.state';

export const URL_STATE_NAME = 'urls';
const getUrlsState = createFeatureSelector<UrlsState>(URL_STATE_NAME);
export const getUrls = createSelector(getUrlsState, (state) => {
  return state.urls;
});

export const getMyUrls = (userName: string) =>
  createSelector(getUrlsState, (state) => {
    return state.urls.filter((urls) => urls.createdByUserName === userName);
  });

export const getUrlByShortUrl = (shortUrl: string) =>
  createSelector(getUrlsState, (state) => {
    return state.urls.find((url) => url.shortUrl === shortUrl);
  });
