import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CardserviceService {

  url = "http://localhost:3000/api/v1/cards";
  constructor(private http: HttpClient) { }
  seedCards(data: any): Observable<any> {
    return this.http.post(this.url + '/', data, httpOptions);
  }
  getCards(username:String): Observable<any> {
    return this.http.get(this.url + '/'+username, httpOptions);
  }
  updateActivity(data: any, username: String, type: String): Observable<any> {

    return this.http.put(this.url + '/user-activity/' + username + '/' + type, data, httpOptions)
  }
  getUserActivity(username: String): Observable<any> {
    return this.http.get(this.url + '/user-activity/' + username);
  }
}
