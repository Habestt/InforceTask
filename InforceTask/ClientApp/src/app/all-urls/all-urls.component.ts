import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-urls',
  templateUrl: './all-urls.component.html',
})
export class AllUrlsComponent {
  public urls: Url[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Url[]>(environment.Url + 'url/getAll').subscribe((result) => {
      this.urls = result;
    });
  }
}

interface Url {
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
}
