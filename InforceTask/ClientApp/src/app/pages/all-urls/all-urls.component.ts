import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Url } from '../../global/models/url';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { getUrls } from 'src/app/state/url/url.selector';
import { deleteUrl, loadUrls } from 'src/app/state/url/url.actions';

@Component({
  selector: 'app-all-urls',
  templateUrl: './all-urls.component.html',
})
export class AllUrlsComponent implements OnInit {
  urls?: Observable<Url[]>;

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  ngOnInit(): void {
    this.urls = this.store.select(getUrls);
    this.store.dispatch(loadUrls());
    console.log(this.urls);
  }

  delete(url: Url) {
    const id: number = url.id;
    this.store.dispatch(deleteUrl({ id }));
  }
}
