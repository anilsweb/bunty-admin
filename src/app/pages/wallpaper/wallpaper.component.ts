import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalComponent } from 'src/app/@common/modal/modal.component';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.scss']
})
export class WallpaperComponent implements OnInit {

  modal = {
    "pageIndex": 1,
    "pageSize": 10,
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
    this.list();
    this.cateList();
  }
  cateList() {
    this.service.PostService(this.modal, 'Master/CategoryDropdownList').subscribe(res => {

    })
  }
  list() {
    this.spinner.show();
    this.service.PostService(this.modal, 'Master/WallpapersList').subscribe(res => {
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
      this.service.PostService({ id: id }, 'Master/WallpapersActiveDeactive').subscribe(res => {
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
        this.service.PostService(delData, 'Master/WallpapersDeleteByRange').subscribe(res => {
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
