import { Component, OnInit } from '@angular/core';
import { Url } from '../../../global/models/url';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUrls } from 'src/app/url/state/url.selector';
import { deleteUrl, loadUrls } from 'src/app/url/state/url.actions';
import {
  isAdmin,
  isAuthenticated,
  isMyUrl,
} from 'src/app/auth/state/auth.selector';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-all-urls',
  templateUrl: './all-urls.component.html',
})
export class AllUrlsComponent implements OnInit {
  urls?: Observable<Url[]>;
  isAdmin: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isAdmin = this.store.select(isAdmin);
    this.store.dispatch(setLoadingSpinner({ status: true }));
  }

  ngOnInit() {
    this.urls = this.store.select(getUrls);
    this.store.dispatch(loadUrls());
  }

  delete(url: Url) {
    const id: number = url.id;
    this.store.dispatch(deleteUrl({ id }));
  }

  showButton(url: Url) {
    let check = false;

    const admin = this.store.select(isAdmin);
    admin.subscribe((result) => (check = result));

    if (!check) return this.store.select(isMyUrl(url.createdByUserName));

    return admin;
  }
}
