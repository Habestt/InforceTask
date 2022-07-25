import { loginSuccess, autoLogout, signupSuccess } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),

  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: null,
    };
  }),

  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
