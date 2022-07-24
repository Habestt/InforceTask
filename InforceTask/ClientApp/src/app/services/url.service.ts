import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Url } from '../global/models/url';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UrlsService {
  constructor(private http: HttpClient) {}

  getUrls(): Observable<Url[]> {
    return this.http.get<Url[]>(environment.Url + 'url/getAll');
  }

  addUrls(originalUrl: string) {
    return this.http.post(environment.Url + 'url/create', originalUrl);
  }

  deleteUrl(id: number) {
    return this.http.delete(environment.Url + 'url/delete/' + id);
  }
}
