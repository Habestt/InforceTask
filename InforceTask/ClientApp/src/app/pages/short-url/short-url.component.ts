import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
})
export class ShortURLComponent {
  constructor(private http: HttpClient) {}

  Add(OriginalUrl: string) {
    return this.http
      .post(environment.Url + 'url/create', OriginalUrl)
      .subscribe();
  }
}
