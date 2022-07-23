import { Component, OnInit, ViewChild } from '@angular/core';
import { Url } from '../../global/models/url';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { getUrls } from 'src/app/state/url/url.selector';
import { deleteUrl, loadUrls } from 'src/app/state/url/url.actions';
import { UrlInfoComponent } from '../url-info/url-info.component';

@Component({
  selector: 'app-all-urls',
  templateUrl: './all-urls.component.html',
})
export class AllUrlsComponent implements OnInit {
  urls?: Observable<Url[]>;

  @ViewChild(UrlInfoComponent) child: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.urls = this.store.select(getUrls);
    this.store.dispatch(loadUrls());
  }

  delete(url: Url) {
    const id: number = url.id;
    this.store.dispatch(deleteUrl({ id }));
  }
}
