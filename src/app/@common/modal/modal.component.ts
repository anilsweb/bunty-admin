import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  modalTitle: any;
  modalAction: any;
  modalData: any;
  modelCategory: any = {};
  url: any;
  selectedfiles: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {},
    private service: CommonService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {
    this.modalData = data;
    console.log(this.modalData);

    this.modalTitle = this.modalData.Title;
    this.modalAction = this.modalData.action;
  }

  ngOnInit(): void {
  }

  onSubmitCategory() {
    if (this.modelCategory.imageURL) {
      console.log(this.modelCategory);
      this.spinner.show();
      this.service.PostService(this.modelCategory, 'Master/CategorySave').subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (res.body.status) {
          this.dialogRef.close(this.modelCategory);
          this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
        } else {
          this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
        }
      })
    }
  }

  onSelectFile(event: any, name: any, modal: any) {
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
    payload.append('type', name);
    payload.append('fileName', files.name);
    payload.append('fileData', this.selectedfiles);
    this.spinner.show();
    this.service.PostService(payload, 'Master/UploadImage').subscribe(res => {
      this.spinner.hide();
      console.log(res);
      modal.imageURL = res.body.result;
      modal.imageName = files.name;
    })
  }

}
