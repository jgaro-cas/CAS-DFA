import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthRequest } from '../models/auth-request';
import { environment } from "../../environments/environment";

const STORAGE_KEY = "auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  /**
   * A "ReplaySubject" is a Subject (a source of an Observable) that emits a predefined number of previously emitted
   * values to an Observer when it subscribes to it.
   * It will act as a sort of local "cache" for the AuthResponse object value.
   */
  private authenticated$: ReplaySubject<AuthResponse>;
  private staffStatus: boolean;
  private citizenStatus: boolean;
  private name: string;

  constructor(private http: HttpClient) { 
    const savedAuth = JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) as AuthResponse;

    this.authenticated$ = new ReplaySubject(1);
    this.authenticated$.next(savedAuth);
  }

  isAuthenticated(): Observable<boolean>{
    return this.authenticated$.pipe(
      tap((auth) => {this.citizenStatus = auth.user.roles.indexOf("citizen") > -1;
                      this.staffStatus = auth.user.roles.indexOf("staff") > -1;
                      this.name = auth.user.name;
                    }),
      map((auth) => Boolean(auth)));
  }

  getUser(): Observable<User>{
    return this.authenticated$.pipe(
      map((auth) => (auth ? auth.user : undefined)));
  }

  getToken(): Observable<string>{
    return this.authenticated$.pipe(
      map((auth) => (auth ? auth.token : undefined)));
  }

  getStaffStatus(){
    return this.staffStatus;
  }

  getCitizenStatus(){
    return this.citizenStatus;
  }

  getUserName(){
    return this.name;
  }

  login(authRequest: AuthRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth`, authRequest).pipe(
      tap((response) => this.saveAuth(response)),
      map((response) => {
        this.authenticated$.next(response);
        console.log(`User ${response.user.name} logged in`);
        return response.user;
      })
    );
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this.authenticated$.next(null);
    console.log("User logged out");
  }

  /**
   * Saves the AuthResponse in the localStorage
   */
  private saveAuth(auth: AuthResponse) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }
}
