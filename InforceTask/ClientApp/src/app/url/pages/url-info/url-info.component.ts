import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-url-info',
  templateUrl: './url-info.component.html',
})
export class UrlInfoComponent {
  url: any;
  check: any;

  constructor(private router: Router) {
    this.url = this.router.getCurrentNavigation()?.extras.state;
  }
}
