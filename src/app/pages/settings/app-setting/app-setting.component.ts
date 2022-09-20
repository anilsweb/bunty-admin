import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.scss']
})
export class AppSettingComponent implements OnInit {
  model: any = {isSecure:false}
  resumeEditorCreation: any

  selectedfiles: any;
  logoLightUrl: any;
  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { 
    this.spinner.show();
    this.service.getservice({}, 'Settings/GetAppSettingsDetails').subscribe(res => {
      this.spinner.hide();
        this.model = res.body.result;
        this.logoLightUrl = this.model?.appLogo
    })
    
  }

  ngOnInit(): void {
  }

  onSelectFile(event: any, name: any, modal: any) {
    const files = event.target.files[0];
    this.selectedfiles = event.target.files[0];
    if (files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
          this.logoLightUrl = e.target.result;
      }
      reader.readAsDataURL(files);
    }
    const payload = new FormData();
    payload.append('type', name);
    payload.append('fileName', files.name);
    payload.append('fileData', this.selectedfiles);
    this.spinner.show();
    this.service.PostService(payload, 'Master/UploadImage').subscribe(res => {
      this.spinner.hide();
        modal.logo = res.body.result;;
    })
  }

  onSubmit() {
      this.spinner.show();
      this.service.PostService(this.model, 'Settings/AppSettingsDetailsSave').subscribe(res => {
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
