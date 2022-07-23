import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './global/components/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { CounterComponent } from './pages/counter/counter.component';
import { ShortURLComponent } from './pages/short-url/short-url.component';
import { AllUrlsComponent } from './pages/all-urls/all-urls.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UrlsEffects } from './state/url/url.effects';
import { urlsReducer } from './state//url/url.reducer';
import { UrlInfoComponent } from './pages/url-info/url-info.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    ShortURLComponent,
    AllUrlsComponent,
    UrlInfoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    StoreModule.forRoot({urls: urlsReducer}),
    EffectsModule.forRoot([UrlsEffects]),
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'short-url', component: ShortURLComponent },
      { path: 'all-urls', component: AllUrlsComponent },
      { path: 'url-info', component: UrlInfoComponent },
    ]),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
