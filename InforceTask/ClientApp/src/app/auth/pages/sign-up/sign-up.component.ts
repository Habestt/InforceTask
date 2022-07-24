import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  constructor(
    private store: Store<AppState>,
    private authSrvice: AuthService
  ) {}

  Add(form: any) {
    this.authSrvice
      .signUp(form.username, form.email, form.password)
      .subscribe(result => console.log(result));
  }
}
