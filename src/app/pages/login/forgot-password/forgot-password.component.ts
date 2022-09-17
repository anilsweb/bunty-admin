import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  favIcon: any = document.querySelector('#favIcon')
  genData: any;
  constructor(private formBuilder: FormBuilder,
    private service: CommonService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private titleService: Title,
  ) {
    this.service.genralDetail.subscribe(res => {
      this.genData = res;
      this.titleService.setTitle(this.genData.title);
      this.favIcon.href = this.genData?.favicon ? this.genData?.favicon : '/assets/images/dummy.png';
    })
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.spinner.show();
    this.service.PostService(this.registerForm.value, 'Account/ForgotPassword').subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (res.body.status) {
        this.router.navigate(['/login/email-confirm'])
        // this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
      } else {
        this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
      }
    })
  }
}
