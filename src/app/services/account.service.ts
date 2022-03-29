import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';
import { IUser } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _user = new BehaviorSubject<IUser | null>(null);
  private _user$ = this._user.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  setUser(user: IUser) {
    this._user.next(user);
  }
  getUser() {
    return this._user$;
  }

  getRawUserValue() {
    return this._user.getValue();
  }

  async registerUser(newUser: Partial<IUser>) {
    try {
      const user = await firstValueFrom(
        this.http.post<{ user: IUser }>(
          `${environment.apiUrl}/users/register`,
          newUser
        )
      );
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async authenticateUserServer(credentials: {
    email: string;
    password: string;
  }) {
    const { email, password } = credentials;
    try {
      const user = await firstValueFrom(
        this.http.post<{ user: IUser }>(
          `${environment.apiUrl}/users/authenticate`,
          { email, password },
          { withCredentials: true }
        )
      );
      JwtInterceptor.accessToken = user.user.token;
      this.setUser(user.user);
    } catch (error) {
      console.log(error);
    }
  }
  async getAuthenticatedUserServer() {
    try {
      const user = await firstValueFrom(
        this.http.get<{ user: IUser }>(`${environment.apiUrl}/users/getUser`)
      );
      JwtInterceptor.accessToken = user.user.token;

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async logoutServer() {
    try {
      const loggedOut = await firstValueFrom(
        this.http.post<{ loggedOut: boolean }>(
          `${environment.apiUrl}/users/logout`,
          {}
        )
      );
      JwtInterceptor.accessToken = '';
      this.router.navigate(['/account/login']);
      return loggedOut.loggedOut;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  refreshToken() {
    return this.http.post<{ token: string }>(
      `${environment.apiUrl}/users/refresh`,
      {},
      { withCredentials: true }
    );
  }

  isEmailTaken(email: string) {
    return this.http.post<{ isEmailTaken: boolean }>(
      `${environment.apiUrl}/users/isEmailTaken`,
      { email }
    );
  }
}
