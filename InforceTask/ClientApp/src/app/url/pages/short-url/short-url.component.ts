import { Component } from '@angular/core';
import { UrlsService } from 'src/app/services/url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css'],
})
export class ShortURLComponent {
  constructor(private urlService: UrlsService) {}

  Add(originalUrl: string) {
    this.urlService.addUrls(originalUrl).subscribe();
  }
}
