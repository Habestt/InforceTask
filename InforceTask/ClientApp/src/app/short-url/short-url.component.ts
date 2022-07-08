import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html'
})
export class ShortURL {  

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    console.log(baseUrl);
  }

  async Add(url: any) {
    return this.http.post(this.baseUrl + 'url/create', url).subscribe((result) => {
      console.warn(result);
    });
  }  
}

interface URL {
  url: string;  
}
