import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/state/auth.actions';
import { AppState } from './store/app.state';
import { getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';
  showLoading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.showLoading = this.store.select(getLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
