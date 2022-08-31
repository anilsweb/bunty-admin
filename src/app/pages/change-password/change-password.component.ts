import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show();
    this.service.PostService(this.registerForm.value, 'Account/ChangePassword').subscribe(res => {
      this.spinner.hide();
      if (res.body.status) {
        this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
        this.router.navigate(['/login']);
      } else {
        this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
      }
    })
  }
}
