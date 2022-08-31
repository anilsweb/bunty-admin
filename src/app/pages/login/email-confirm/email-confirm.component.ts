import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {

  paramData: any;
  verifyData: any;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramData = params;
      if (this.paramData.token) {
        this.verify(this.paramData.token);
      }
    })
    this.registerForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('newPassword', 'confirmPassword')
    });
  }

  verify(token: any) {
    this.spinner.show();
    this.service.PostService(null, `Account/VerifyForgotPasswordToken?token=${token}`).subscribe(res => {
      this.verifyData = res.body;
      this.spinner.hide();
    })
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show();
    this.service.PostService({...this.registerForm.value, token: this.paramData.token}, 'Account/ResetPassword').subscribe(res => {
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
