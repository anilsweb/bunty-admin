import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from 'src/app/@common/modal/modal.component';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  TableIndex: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  length: number = 20;
  pageEvent: any = PageEvent;
  modal: any = {
    "searchText": null
  }
  catList: any[] = [];
  deleteIds: any[] = [];

  constructor(
    public dialog: MatDialog,
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.list(1,10);
  }

  list(offset: any, limit: any) {
    this.spinner.show();
    this.modal.pageIndex = offset;
    this.modal.pageSize = limit;
    this.service.PostService(this.modal, 'Master/SubcategoryList').subscribe(res => {
      console.log(res);
      this.catList = res.body.result;
      this.length = res.body.totalCount;
      this.spinner.hide();
    })
  }

  getPage(event: any) {
    let offset;
    offset = event.pageIndex + 1;
    this.TableIndex = event.pageIndex * event.pageSize;
    this.list(offset, event.pageSize);
  }
  add(action: any, name: any, obj: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { action: action, Title: name, obj: obj }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.list(1, 10);
      }
    });
  }
  toggle(e: any, id: any) {
    if (e) {
      this.spinner.show();
      this.service.PostService({ id: id }, 'Master/SubcategoryActiveDeactive').subscribe(res => {
        this.spinner.hide();
        if (res.body.result.isSuccess) {
          this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
        } else {
          this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
        }
      })
    }
  }
  noCheck(e: any, id: any) {
    if (e.checked) {
      this.deleteIds.push(id);
    } else {
      const index = this.deleteIds.findIndex(x => x == id);
      this.deleteIds.splice(index, 1);
    }
    console.log(this.deleteIds);

  }
  delete(action: any, name: any, id: any, type: any) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      data: { action: action, Title: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spinner.show();
        let delData = [];
        if (type == 'single') {
          delData.push(id);
        } else {
          delData = id;
        }
        this.service.PostService(delData, 'Master/SubcategoryDeleteByRange').subscribe(res => {
          this.spinner.hide();
          if (res.body.result.isSuccess) {
            this.list(1,10);
            this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
          } else {
            this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
          }
        })
      }
    });
  }
}
