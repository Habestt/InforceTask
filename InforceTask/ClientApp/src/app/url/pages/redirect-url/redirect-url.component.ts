import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getUrlByShortUrl } from 'src/app/url/state/url.selector';
import { loadUrls } from 'src/app/url/state/url.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect-url',
  templateUrl: './redirect-url.component.html',
})
export class RedirectUrlComponent implements OnInit {
  urlss?: string;
  postSubscription?: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    let url = '';
    this.route.paramMap.subscribe((params) => {
      const link = params.get('link');
      this.postSubscription = this.store
        .select(getUrlByShortUrl(link!))
        .subscribe((data) => {
          url = data?.originalUrl!;
          if (!(url === undefined)) {
            if (url.includes('https://')) {
              window.location.href = url;
            } else {
              window.location.href = `https://${url}`;
            }
            console.log(url);
          }
        });
    });

    this.store.dispatch(loadUrls());
  }
}
