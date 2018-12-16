import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  profileurlchange = new Subject<string>();

  url = "http://localhost:3000/api/v1/users";
  constructor(private http: HttpClient) { }
  login(user: User): Observable<any> {
    return this.http.post(this.url + '/signin', user, httpOptions)
      .pipe(
        tap(heroes => console.log(`signin is called`)

        )
      )
  }
  signup(user: User): Observable<any> {
    return this.http.post(this.url + '/signup', user, httpOptions);
  }
  getSkills(): Observable<any> {
    return this.http.get(this.url + '/all/skills');
  }
  updateUser(data: any): Observable<any> {
    return this.http.put(this.url + '/' + data.username, data, httpOptions)

  }

  isAuthenticated(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/auth/');
  }
  authenticate() {
    this.authenticated = true;
  }
  unAuthenticate() {
    this.authenticated = false;
  }
  logOut() {
    return this.http.get('http://localhost:3000/api/v1/auth/logout');
  }
  getUser(username: string): Observable<any> {
    return this.http.get(this.url + '/' + username);
  }
  setUserProfile(username: string, profileurl: string): Observable<any> {
    this.profileurlchange.next(profileurl);
    return this.http.put(this.url + '/profile/' + username, { imagePath: profileurl });
  }
  removeProfile(username: string, url: number): Observable<any> {
    return this.http.delete(this.url + '/profile/' + username + '/' + url);
  }
  getProfile(username: string): Observable<any> {
    return this.http.get(this.url + '/profile/' + username);
  }

  imageUpload(image: File, type: string, username: string): Observable<any> {
    const data = new FormData();
    data.append("type", type);
    data.append("username", username);
    data.append("imagePath", image);
    return this.http
      .post<any>(
        this.url + '/image/upload',
        data
      )


  }




}
