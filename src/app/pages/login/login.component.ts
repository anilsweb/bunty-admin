import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  LoginResult: any;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private service: CommonService,
    private snackBar: MatSnackBar,
    private router: Router,

  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  get f() { return this.loginForm.controls; }
  updateProfile() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.spinner.show();
      this.service.PostService(this.loginForm.value, 'Account/Login')
        .subscribe((response: any) => {
          this.spinner.hide();
          console.log(response)
          this.LoginResult = response.body;
          if (this.LoginResult?.status) {
            localStorage.setItem('loginData', JSON.stringify(this.LoginResult.result));
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
