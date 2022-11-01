import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


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
  modelSubCategory: any = {};
  modelWallpaper: any = {
    tagsList: [],
    imagesList: []
  };
  cateogyList: any[] = [];
  subCateogyList: any[] = [];
  modelUser: any = {};
  modelRole: any = {};
  roleList: any[] = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fruits: any[] = [];

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
    if (this.modalAction == 'editCategory') {
      this.modelCategory = this.modalData.obj;
      this.url = this.modelCategory.imageURL;
    }
    if (this.modalAction == 'editSubCategory') {
      this.modelSubCategory = this.modalData.obj;
      this.url = this.modelSubCategory.imageURL;
    }
    if (this.modalAction == 'addSubCategory' || this.modalAction == 'editSubCategory' || this.modalAction == 'addWallpaper' || this.modalAction == 'editWallpaper') {
      this.categoryDropDown();
    }
    if (this.modalAction == 'editWallpaper') {
      this.getCategory(this.modalData?.obj?.category_id);
    }
    if (this.modalAction == 'addUser' || this.modalAction == 'editUser') {
      this.roleDropDown();
    }
    if (this.modalAction == 'editUser') {
      this.modelUser = this.modalData.obj;
    }
    if (this.modalAction == 'editWallpaper') {
      this.modelWallpaper = this.modalData.obj;
      this.url = this.modelWallpaper.imageURL;
    }
    if (this.modalAction == 'editRole') {
      this.modelUser = this.modalData.obj;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.modelWallpaper?.tagsList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.modelWallpaper?.tagsList.indexOf(fruit);

    if (index >= 0) {
      this.modelWallpaper?.tagsList.splice(index, 1);
    }
  }

  roleDropDown() {
    this.spinner.show();
    this.service.getservice({}, 'UserRoles/RolesDropDownList').subscribe(res => {
      this.spinner.hide();
      this.roleList = res.body.result;
    });
  }

  categoryDropDown() {
    this.spinner.show();
    this.service.getservice({}, 'Master/CategoryDropdownList').subscribe(res => {
      this.spinner.hide();
      this.cateogyList = res.body.result;
    });
  }

  onSubmitCategory(type: any) {
    if (this.modelCategory.imageURL) {
      console.log(this.modelCategory);
      this.spinner.show();
      console.log(type);
      let apiName;
      if (type == 'add') {
        apiName = 'Master/CategorySave';
      } else {
        apiName = 'Master/CategoryUpdate';
      }
      this.service.PostService(this.modelCategory, apiName).subscribe(res => {
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

  onSubmitSubCategory(type: any) {
    if (this.modelSubCategory.imageURL) {
      console.log(this.modelSubCategory);
      this.spinner.show();
      console.log(type);
      let apiName;
      if (type == 'add') {
        apiName = 'Master/SubcategorySave';
      } else {
        apiName = 'Master/SubcategoryUpdate';
      }
      this.service.PostService(this.modelSubCategory, apiName).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (res.body.status) {
          this.dialogRef.close(this.modelSubCategory);
          this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
        } else {
          this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
        }
      })
    }
  }

  onSubmitWallpaper(type: any) {
    console.log(this.modelWallpaper);

    if (type == 'add' ? this.modelWallpaper?.imagesList?.length > 0 : this.modelWallpaper.imageURL) {
      console.log(this.modelWallpaper);
      this.spinner.show();
      console.log(type);
      let apiName;
      if (type == 'add') {
        apiName = 'Master/WallpaperSave';
      } else {
        apiName = 'Master/WallpaperUpdate';
      }
      this.service.PostService(this.modelWallpaper, apiName).subscribe(res => {
        this.spinner.hide();
        console.log(res);
        if (res.body.status) {
          this.dialogRef.close(this.modelWallpaper);
          this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
        } else {
          this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
        }
      })
    }
  }

  onSelectFile(event: any, name: any, modal: any, text: any) {
    
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
      if (text == 'single') {
        modal.imageURL = res.body.result;
        modal.imageName = files.name;
      }
      else {
        modal.imagesList.push({
          imageURL: res.body.result,
          imageName: files.name
        })
      }
    })
  }

  onSubmitUser() {
    console.log(this.modelSubCategory);
    this.spinner.show();
    let apiName = 'UserManagement/UserSave';
    this.service.PostService(this.modelUser, apiName).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (res?.body?.status) {
        this.dialogRef.close(this.modelUser);
        this.service.snackbarOpen(res?.body?.result?.message, 'x', 'success-snackbar');
      } else {
        this.service.snackbarOpen(res?.body?.result?.message, 'x', 'danger-snackbar');
      }
    })
  }

  onSubmitRole() {
    this.spinner.show();
    let apiName = 'UserRoles/RoleSave';
    this.service.PostService(this.modelUser, apiName).subscribe(res => {
      this.spinner.hide();
      console.log(res);
      if (res?.body?.status) {
        this.dialogRef.close(this.modelUser);
        this.service.snackbarOpen(res?.body?.result?.message, 'x', 'success-snackbar');
      } else {
        this.service.snackbarOpen(res?.body?.result?.message, 'x', 'danger-snackbar');
      }
    })
  }

  getCategory(e: any) {
    this.spinner.show();
    this.service.getservice({}, `Master/SubcategoryDropdownList?categoryid=${e}`).subscribe(res => {
      this.spinner.hide();
      this.subCateogyList = res.body.result;
    });
  }

  multiRemove(list: any, i: any) {
    list.splice(i, 1);
  }

}
