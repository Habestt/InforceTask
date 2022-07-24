import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import jwt, { JwtPayload } from 'jwt-decode';
import { JwtClaims } from 'src/app/global/models/jwt-claims';
import { AuthResponse } from 'src/app/global/models/auth-response';
import { loginStart } from '../../state/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent {
  constructor(
    private store: Store<AppState>,
    private authSrvice: AuthService
  ) {}

  logIn(form: any) {
    const email = form.email;
    const password = form.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
}
