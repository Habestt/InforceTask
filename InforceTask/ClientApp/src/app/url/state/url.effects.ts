import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import {
  loadUrls,
  loadUrlsSuccess,
  deleteUrl,
  deleteUrlSuccess,
  createUrl,
  createUrlSuccess,
} from './url.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/services/url.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.actions';
import { of } from 'rxjs';

@Injectable()
export class UrlsEffects {
  constructor(
    private actions$: Actions,
    private urlsService: UrlsService,
    private store: Store<AppState>
  ) {}

  loadUrls$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUrls),
      mergeMap((action) => {
        return this.urlsService.getUrls().pipe(
          map((urls) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loadUrlsSuccess({ urls });
          })
        );
      })
    );
  });

  creteUrl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUrl),
      exhaustMap((action) => {
        return this.urlsService.addUrl(action.originalUrl, action.userId).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return createUrlSuccess();
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.urlsService.getErrorMessage(
              errResp.error
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  deleteUrl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUrl),
      switchMap((action) => {
        return this.urlsService.deleteUrl(action.id).pipe(
          map((data) => {
            return deleteUrlSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
