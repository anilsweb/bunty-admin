import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ModalComponent } from 'src/app/@common/modal/modal.component';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  catList: any[] = [];
  deleteIds: any[] = [];

  TableIndex: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  length: number = 20;
  pageEvent: any = PageEvent;
  searchName: any;

  public userQuestion!: string;
  userQuestionUpdate = new Subject<string>();

  constructor(
    public dialog: MatDialog,
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) {
    // Debounce search.
    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchName = value;
        this.list(1, 10);
      });
  }

  ngOnInit(): void {
    this.list(1, 10);
  }

  list(start: any, length: any) {
    this.spinner.show();
    let InputData = {
      "searchText": this.searchName,
      "pageIndex": start,
      "pageSize": length,
    }
    this.service.PostService(InputData, 'UserRoles/RolesList').subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.catList = res.body.result;
      this.length = res.body.totalCount;
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
      this.service.PostService({ id: id }, 'UserRoles/RoleActiveDeactive').subscribe(res => {
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
        this.service.PostService(delData, 'UserRoles/RoleDeleteByRange').subscribe(res => {
          this.spinner.hide();
          if (res.body.result.isSuccess) {
            this.list(1, 10);
            this.service.snackbarOpen(res.body.result.message, 'x', 'success-snackbar');
          } else {
            this.service.snackbarOpen(res.body.result.message, 'x', 'danger-snackbar');
          }
        })
      }
    });
  }
}
