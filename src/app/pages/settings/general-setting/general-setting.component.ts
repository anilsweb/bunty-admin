import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit {

  model: any = {};
  selectedfiles: any;
  logoLightUrl: any;
  logoDarkUrl: any;
  favIconUrl: any;

  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.service.genralDetail.subscribe(res => {
      this.model = res;
      this.logoLightUrl = this.model.logo;
      this.logoDarkUrl = this.model.logoDark;
      this.favIconUrl = this.model.favicon;
    })
  }

  onSelectFile(event: any, name: any, modal: any) {
    const files = event.target.files[0];
    console.log(files);

    this.selectedfiles = event.target.files[0];
    if (files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        if (name == 'LogoLight') {
          this.logoLightUrl = e.target.result;
        } else if (name == 'LogoDark') {
          this.logoDarkUrl = e.target.result;
        } else if (name == 'FavIcon') {
          this.favIconUrl = e.target.result;
        }
      }
      reader.readAsDataURL(files);
    }
    const payload = new FormData();
    payload.append('type', 'Web');
    payload.append('fileName', files.name);
    payload.append('fileData', this.selectedfiles);
    this.spinner.show();
    this.service.PostService(payload, 'Master/UploadImage').subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (name == 'LogoLight') {
        modal.logo = res.body.result;
      } else if (name == 'LogoDark') {
        modal.logoDark = res.body.result;
      } else if (name == 'FavIcon') {
        modal.favicon = res.body.result;
      }
      // modal.imageName = files.name;
    })
  }

  onSubmit() {
    if (this.model.logo && this.model.logoDark && this.model.favicon) {
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

}
