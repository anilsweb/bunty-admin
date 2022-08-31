import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from 'src/app/@common/modal/modal.component';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  modal = {
    "pageIndex": 1,
    "pageSize": 10,
    "searchText": null
  }
  catList: any[] = [];

  constructor(
    public dialog: MatDialog,
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.spinner.show();
    this.service.PostService(this.modal, 'Master/SubcategoryList').subscribe(res => {
      console.log(res);
      this.catList = res.body.result;
      this.spinner.hide();
    })
  }

  add(action: any, name: any, obj: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { action: action, Title: name, obj: obj }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.list();
      }
    });
  }
  toggle(e: any, id: any) {
    if (e) {
      this.spinner.show();
      this.service.PostService({ id: id }, 'Master/CategoryActiveDeactive').subscribe(res => {
        this.spinner.hide();
        if (res.body.result.isSuccess) {
          this.list();
          this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
        } else {
          this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
        }
      })
    }
  }
  delete(action: any, name: any, id: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { action: action, Title: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        this.service.PostService({ id: id }, 'Master/CategoryDelete').subscribe(res => {
          this.spinner.hide();
          if (res.body.result.isSuccess) {
            this.list();
            this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
          } else {
            this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
          }
        })
      }
    });
  }
}
