import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  url: any;
  selectedfiles: any;
  model: any = {};

  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.service.getservice(null, 'Account/ProfileGetById').subscribe((res: any) => {
      this.spinner.hide();
      console.log(res);
      this.model = res.body.result;
    })
  }

  onSelectFile(event: any) {
    const files = event.target.files[0];
    console.log(files);

    this.selectedfiles = event.target.files[0];
    if (files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
      reader.readAsDataURL(files);
    }
    const payload = new FormData();
    payload.append('type', 'profile');
    payload.append('fileName', files.name);
    payload.append('fileData', this.selectedfiles, this.selectedfiles?.name);
    this.spinner.show();
    this.service.PostService(payload, 'Master/UploadImage').subscribe(res => {
      this.spinner.hide();
      console.log(res);

    })
  }

  onSubmit() {
    this.spinner.show();
    this.service.PostService(this.model, 'Account/ProfileUpdate').subscribe(res => {
      this.spinner.hide();
      this.snackBar.open('this.LoginResult?.result?.status?.message', 'x', {
        panelClass: ['success-snackbar'],
        duration: 30000000
      });
    })
  }

}
