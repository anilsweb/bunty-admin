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
  loginForm:any = FormGroup;
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
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  get f() { return this.loginForm.controls; }
  updateProfile() {
    this.submitted = true;
    debugger
    if (this.loginForm.valid) {
    this.spinner.show();
    this.service.PostService(this.loginForm.value, 'Account/Login')
      .subscribe((response: any) => {
        this.spinner.hide();
        console.log(response.body)
        this.LoginResult = response.body;
        if (!response.body.Error) {
          this.snackBar.open('Login Successful', 'x', {
            panelClass: ['success-snackbar'],
            duration:  3000
          });
        }
        this.router.navigate([''])
      });
  }
  }

}
