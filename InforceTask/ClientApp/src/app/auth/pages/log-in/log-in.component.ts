import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';
import { loginStart } from '../../state/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  errorMessage: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.errorMessage = this.store.select(getErrorMessage);
  }

  logIn(form: any) {
    const email = form.email;
    const password = form.password;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ email, password }));
  }
}
