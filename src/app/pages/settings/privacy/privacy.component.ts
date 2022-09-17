import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  model: any = {};

  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.PostService(this.model, 'Settings/GetPrivacyPolicy').subscribe(res => {
      this.spinner.hide();
      this.model = res;
    })
  }

  onSubmit() {
      this.spinner.show();
      this.service.PostService(this.model, 'Settings/GeneralDetailsSave').subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (res.body.status) {
          this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
        } else {
          this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
        }
      })
  }

}
