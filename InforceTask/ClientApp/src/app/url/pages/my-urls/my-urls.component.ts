import { Component, Inject, OnInit } from '@angular/core';
import { Url } from '../../../global/models/url';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getMyUrls } from 'src/app/url/state/url.selector';
import { deleteUrl, loadUrls } from 'src/app/url/state/url.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { getUsersUserName } from 'src/app/auth/state/auth.selector';

@Component({
  selector: 'app-my-urls',
  templateUrl: './my-urls.component.html',
})
export class MyUrlsComponent implements OnInit {
  urls?: Observable<Url[]>;
  userName: string = '';
  baseUrl: string;

  constructor(
    private store: Store<AppState>,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.baseUrl = baseUrl;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store
      .select(getUsersUserName)
      .subscribe((result) => (this.userName = result));
  }

  ngOnInit(): void {
    this.urls = this.store.select(getMyUrls(this.userName));
    this.store.dispatch(loadUrls());
  }

  delete(url: Url) {
    const id: number = url.id;
    this.store.dispatch(deleteUrl({ id }));
  }
}
