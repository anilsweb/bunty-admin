import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';
declare let ClientIP: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  LoginResult: any;
  submitted = false;
  windowData: any = {}

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private service: CommonService,
    private snackBar: MatSnackBar,
    private router: Router,
    public _http: HttpClient,

  ) {
    this._http.get<any>('https://jsonip.com')
      .subscribe(data => {
        this.windowData.IpAddress = data.ip;
        this.windowData.BrowserName = (function () {
          var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
          if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
          }
          if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edge\/(\d+)/)
            if (tem != null) { return { name: 'Opera', version: tem[1] }; }
          }
          M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
          if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
          return M[0];
        })()
        this.windowData.BrowserVersion = (function () {
          var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
          if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
          }
          if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR|Edge\/(\d+)/)
            if (tem != null) { return { name: 'Opera', version: tem[1] }; }
          }
          M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
          if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
          return M[1];
        })()


        this.windowData.OSName = "";
        if (navigator.appVersion.indexOf("Win") != -1) this.windowData.OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) this.windowData.OSName = "MacOS";
        if (navigator.appVersion.indexOf("X11") != -1) this.windowData.OSName = "UNIX";
        if (navigator.appVersion.indexOf("Linux") != -1) this.windowData.OSName = "Linux";


        // browser data as per need
        console.log(this.windowData);

      });

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      browserName: [''],
      browserVersion: [''],
      ipAddress: [''],
      osName: ['']
    });
  }

  ngOnInit(): void {
  }
  get f() { return this.loginForm.controls; }
  updateProfile() {
    this.submitted = true;
    this.loginForm.value.browserName = this.windowData.BrowserName;
    this.loginForm.value.browserVersion = this.windowData.BrowserVersion;
    this.loginForm.value.ipAddress = this.windowData.IpAddress;
    this.loginForm.value.osName = this.windowData.OSName;
    if (this.loginForm.valid) {
      this.spinner.show();
      this.service.PostService(this.loginForm.value, 'Account/Login')
        .subscribe((response: any) => {
          this.spinner.hide();
          console.log(response)
          this.LoginResult = response.body;
          if (this.LoginResult?.status) {
            localStorage.setItem('loginData', JSON.stringify(this.LoginResult.result));
            this.service.loginUserName.next({name: this.LoginResult.result?.name});
            this.router.navigate(['/']);
          } else {
            this.snackBar.open(this.LoginResult?.result?.status?.message, 'x', {
              panelClass: ['success-snackbar'],
              duration: 3000
            });
          }
        });
    }
  }

}
