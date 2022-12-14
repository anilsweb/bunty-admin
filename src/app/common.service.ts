import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseUrl: any;
  ChatData = new Subject();
  headers: any = '';
  genralDetail = new BehaviorSubject({});
  loginUserName = new BehaviorSubject({});
  constructor(
    public http: HttpClient,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.baseUrl = 'https://jewelryapp.unlein.com/api/';
  }
  getservice(saveData: any, currentUrl: any): Observable<any> {
    var currentToken: any;
    currentToken = JSON.parse(localStorage.getItem('loginData') || '{}');
    console.log(currentToken);

    const httpHeaders = new HttpHeaders({
      // 'accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentToken.token
    });

    return this.http.get(this.baseUrl + currentUrl,
      {
        headers: httpHeaders,
        observe: 'response'
      }).pipe(
        catchError(err => {
          this.spinner.hide();
          console.log(err?.status);
          if (err?.status === 401) {
            localStorage.clear();
            this.router.navigate(['loginData']).then(() => {
              window.location.reload();
            });
          }
          return throwError(err);
        })
      )
  }
  loginService(saveData: any, currentUrl: any): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'accept': 'application/json',
      'Content-Type': 'application/json',

    });

    return this.http.post(this.baseUrl + currentUrl, saveData,
      {
        headers: httpHeaders,
        observe: 'response'
      }).pipe(

        catchError(err => {
          this.spinner.hide();
          if (err.status == 400) {
            console.log(err.error.Error)
            this.snackBar.open(err.error.Error, 'x', {
              panelClass: ['danger-snackbar'],
              duration: 3000
            });
          } else if (err.status == 500) {
            console.log(err.error.msg)
            this.snackBar.open(err.error.msg, 'x', {
              panelClass: ['danger-snackbar'],
              duration: 3000
            });
          }
          else if (err.status == 406) {
            console.log(err.error)
            this.snackBar.open(err.error, 'x', {
              panelClass: ['danger-snackbar'],
              duration: 3000
            });
          }
          else {
            this.snackBar.open(err?.error?.message, 'x', {
              panelClass: ['danger-snackbar'],
              duration: 3000
            });
          }
          return throwError(err);
        })
      )
  }
  PostService(saveData: any, currentUrl: any): Observable<any> {
    var currentToken: any;
    currentToken = JSON.parse(localStorage.getItem('loginData') || '{}');
    const httpHeaders = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + currentToken.token
      // 'authorization': currentToken
    });
    console.log(currentToken);
    return this.http.post(this.baseUrl + currentUrl, saveData,
      {
        headers: httpHeaders,
        observe: 'response'
      }).pipe(
        catchError(err => {
          this.spinner.hide();
          console.log(err?.status);
          if (err?.status === 401) {
            localStorage.clear();
            this.router.navigate(['loginData']).then(() => {
              window.location.reload();
            });
          }
          return throwError(err);
        })
      )
  }
  snackbarOpen(msg: any, action: any, sclass: any) {
    this.snackBar.open(msg, action, {
      panelClass: [sclass],
      duration: 3000
    });
  }
}

