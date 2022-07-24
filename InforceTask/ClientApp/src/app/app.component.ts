import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/state/auth.actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
