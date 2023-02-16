import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.apiBaseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicaton/json'
    })
  }
  constructor(
    private http: HttpClient
  ) {
    const token = JSON.parse(localStorage.getItem('userData') || '{}');
    if (token) {
      this.setToken(token?.token)
    }
  }
  // set the token for the service
  setToken(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
  }
  post(data: any, endPoint: any): Observable<any> {
    // make a POST request to the API
    return this.http.post<any>(this.baseUrl + endPoint, data, this.httpOptions);
  }
}
