import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});

export const isMyUrl = (userName: string) =>
  createSelector(getAuthState, (state) => {
    return state.user?.username === userName ? true : false;
  });

export const isAdmin = createSelector(getAuthState, (state) => {
  return state.user?.role === 'Administrator' ? true : false;
});

export const getUserId = createSelector(getAuthState, (state) => {
  return state.user ? state.user.id : 0;
});
export const getUsersUserName = createSelector(getAuthState, (state) => {
  return state.user ? state.user.username : '';
});
