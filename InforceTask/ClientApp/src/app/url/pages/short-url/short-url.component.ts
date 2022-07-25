import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UrlsService } from 'src/app/services/url.service';
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
  constructor(private store: Store<AppState>, private urlService: UrlsService) {
    this.errorMessage = this.store.select(getErrorMessage);
  }

  Add(originalUrl: string) {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(createUrl({ originalUrl }));
  }
}
