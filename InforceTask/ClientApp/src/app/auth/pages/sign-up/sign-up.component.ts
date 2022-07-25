import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';
import { signupStart } from '../../state/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  errorMessage: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.errorMessage = this.store.select(getErrorMessage);
  }

  Add(form: any) {
    const userName = form.username;
    const email = form.email;
    const password = form.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ userName, email, password }));
  }
}
