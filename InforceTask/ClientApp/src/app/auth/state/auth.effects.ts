import { AuthService } from './../../services/auth.service';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.logIn(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.router.navigate(['/']);
            return loginSuccess({ user, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService
          .signUp(action.userName, action.email, action.password)
          .pipe(
            map((data) => {
              this.router.navigate(['/log-in']);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return signupSuccess({ redirect: true });
            }),
            catchError((errResp) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              const errorMessage = this.authService.getErrorMessage(
                errResp.error
              );
              return of(setErrorMessage({ message: errorMessage }));
            })
          );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logOut();
        })
      );
    },
    { dispatch: false }
  );
}
