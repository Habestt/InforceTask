import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-url-info',
  templateUrl: './url-info.component.html',
})
export class UrlInfoComponent {
  url: any;
  baseUrl: string;

  constructor(private router: Router, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.url = this.router.getCurrentNavigation()?.extras.state;
  }
}
