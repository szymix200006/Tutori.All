import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationRequest } from '../utils/registration-request';
import { environment } from '../utils/environment';
import { ApiPaths } from '../utils/api-paths';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from '../utils/authentication-request';
import { AuthenticationResponse } from '../utils/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  registerUser(registrationRequest: RegistrationRequest): Observable<{}> {
    let registrationUrl = `${this.baseUrl}${ApiPaths.REGISTRATION}`;
    return this.http.post(registrationUrl, registrationRequest);
  }

  confirmAccount(token: string): Observable<{}> {
    let confirmUrl = `${this.baseUrl}${ApiPaths.ACTIVATE_ACCOUNT}${token}`;
    return this.http.get(confirmUrl);
  }

  authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    let authenticationUrl = `${this.baseUrl}${ApiPaths.AUTHENTICATION}`;
    return this.http.post<AuthenticationResponse>(authenticationUrl, authenticationRequest);
  }
}
