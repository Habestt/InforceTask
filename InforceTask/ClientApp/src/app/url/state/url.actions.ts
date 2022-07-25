import { createAction, props } from '@ngrx/store';
import { Url } from 'src/app/global/models/url';

export const LOAD_URLS_Action = '[urls page] load urls';
export const LOAD_URLS_SUCCESS = '[urls page] load urls success';

export const CREATE_URL_Action = '[urls page] create url';
export const CREATE_URL_SUCCESS = '[urls page] create url success';

export const DELETE_URL_ACTION = '[urls page] delete url';
export const DELETE_URL_SUCCESS = '[urls page] delete url success';

export const loadUrls = createAction(LOAD_URLS_Action);
export const loadUrlsSuccess = createAction(
  LOAD_URLS_SUCCESS,
  props<{ urls: Url[] }>()
);

export const createUrl = createAction(
  CREATE_URL_Action,
  props<{ originalUrl: string }>()
);

export const createUrlSuccess = createAction(CREATE_URL_SUCCESS);

export const deleteUrl = createAction(
  DELETE_URL_ACTION,
  props<{ id: number }>()
);
export const deleteUrlSuccess = createAction(
  DELETE_URL_SUCCESS,
  props<{ id: number }>()
);
