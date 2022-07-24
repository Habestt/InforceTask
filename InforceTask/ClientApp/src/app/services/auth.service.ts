import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../global/models/auth-response';
import { JwtClaims } from '../global/models/jwt-claims';
import { User } from '../global/models/user';
import { AppState } from '../store/app.state';
import jwt, { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  logIn(email: string, password: string) {
    return this.http.post(environment.Url + 'user/authenticate', {
      email,
      password,
    });
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post(environment.Url + 'user/create', {
      username,
      email,
      password,
    });
  }

  logOut() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    document.cookie = `refresh_token=${this.getCookie(
      'refresh_token'
    )};  max-age=-1`;
  }

  formatUser(data: any) {
    let access_token = data.tokens.accessToken;
    let userId = data.user.id;
    localStorage.setItem('access_token', data.tokens.accessToken);
    localStorage.setItem('user_data', JSON.stringify(data.user));
    document.cookie = `refresh_token=${data.tokens.refreshToken}`;
    let decodedJwt: JwtClaims = jwt<JwtClaims>(access_token);
    console.log(data);
    console.log(decodedJwt);
    return new User(userId, decodedJwt.email, decodedJwt.role);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const user = new User(
        userData.id,
        userData.email,
        userData.role,
      );
      return user;
    }
    return null;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  getCookie(name: string) {
    let matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : String;
  }
}