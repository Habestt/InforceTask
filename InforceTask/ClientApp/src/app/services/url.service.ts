import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
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

  deleteUrl(id: number) {
    return this.http.delete(environment.Url + 'url/delete/' + id);
  }
}
