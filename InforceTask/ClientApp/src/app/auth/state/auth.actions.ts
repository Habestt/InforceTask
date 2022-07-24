import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/global/models/user';
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login Success';
export const LOGIN_FAIL = '[auth page] login Fail';

export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const LOGOUT_ACTION = '[auth page] logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User | null; redirect: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autoLogout = createAction(LOGOUT_ACTION);