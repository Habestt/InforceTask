import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './global/components/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { ShortURLComponent } from './url/pages/short-url/short-url.component';
import { AllUrlsComponent } from './url/pages/all-urls/all-urls.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UrlsEffects } from './url/state/url.effects';
import { urlsReducer } from './url/state/url.reducer';
import { UrlInfoComponent } from './url/pages/url-info/url-info.component';
import { appReducer } from './store/app.state';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { LogInComponent } from './auth/pages/log-in/log-in.component';
import { AuthEffects } from './auth/state/auth.effects';
import { authReducer } from './auth/state/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ShortURLComponent,
    AllUrlsComponent,
    UrlInfoComponent,
    SignUpComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    StoreModule.forRoot({ urls: urlsReducer, auth: authReducer }),
    EffectsModule.forFeature([UrlsEffects, AuthEffects]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'short-url', component: ShortURLComponent },
      { path: 'all-urls', component: AllUrlsComponent },
      { path: 'url-info', component: UrlInfoComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'log-in', component: LogInComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
