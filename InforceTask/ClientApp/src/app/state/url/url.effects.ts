import { map, mergeMap, switchMap } from 'rxjs/operators';
import {
  loadUrls,
  loadUrlsSuccess,
  deleteUrl,
  deleteUrlSuccess,
} from './url.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { UrlsService } from 'src/app/services/url.service';

@Injectable()
export class UrlsEffects {
  constructor(private actions$: Actions, private urlsService: UrlsService) {}

  loadUrls$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUrls),
      mergeMap((action) => {
        return this.urlsService.getUrls().pipe(
          map((urls) => {
            return loadUrlsSuccess({ urls });
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
