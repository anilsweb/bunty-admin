import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-ad-mob',
  templateUrl: './ad-mob.component.html',
  styleUrls: ['./ad-mob.component.scss']
})
export class AdMobComponent implements OnInit {
  model: any = {isSecure:false}
  resumeEditorCreation: any

  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { 
    this.spinner.show();
    this.service.getservice({}, 'Settings/GetAdmobSettingsDetails').subscribe(res => {
      this.spinner.hide();
        this.model = res.body.result;
    })
    
  }

  ngOnInit(): void {
  }

  onSubmit() {
      this.spinner.show();
      this.service.PostService(this.model, 'Settings/AdmobSettingsSave').subscribe(res => {
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
