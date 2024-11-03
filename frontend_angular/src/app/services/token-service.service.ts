import { Injectable, signal } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt'
import { AuthenticationResponse } from '../utils/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  currentUserSignal = signal<AuthenticationResponse | undefined | null>(undefined);

  set token(token: string | null) {
    if(token) {
      localStorage.setItem('token', token);
    }
    else localStorage.removeItem('token');
  }

  get token() {
    return localStorage.getItem('token') as string | null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  isTokenValid() {
    const token = this.token;
    if(!token) {
      return false;
    }
    const jwtHelper = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if(isTokenExpired) {
      localStorage.clear();
      this.currentUserSignal.set(null);
      return false;
    }
    return true;
  }
}
