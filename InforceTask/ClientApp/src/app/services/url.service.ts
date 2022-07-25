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

  addUrl(originalUrl: string, userId: number) {
    return this.http.post(environment.Url + 'url/create', {
      originalUrl,
      userId
    });
  }

  deleteUrl(id: number) {
    return this.http.delete(environment.Url + 'url/delete/' + id);
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'URL already exist':
        return 'URL already exist';
      case 'URL is not valid':
        return 'URL is not valid';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }
}
