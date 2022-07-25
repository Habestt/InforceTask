import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserId } from 'src/app/auth/state/auth.selector';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';
import { createUrl } from '../../state/url.actions';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortURLComponent {
  errorMessage: Observable<string>;
  userId: number = 0;

  constructor(private store: Store<AppState>) {
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.select(getUserId).subscribe((result) => (this.userId = result));
  }

  Add(originalUrl: any) {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(createUrl({ originalUrl, userId: this.userId }));
  }
}
