import { Component, OnInit } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
})
export class LoginHistoryComponent implements OnInit {
  TableIndex: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  length: number = 20;
  pageEvent: any = PageEvent;
  modal: any = {
    "UserId": 0, //filter
    "LoginStatusCode": 0, //filter
    "LoginTime": null //filter
  }
  userList: any[] = [];
  userDropdownList: any[] = [];

  loginStatus = [
    { name: 'Success', id: 1 },
    { name: 'Account Deactivated', id: 2 },
    { name: 'Invalid Login', id: 3 },
    { name: 'User Have No Permission', id: 4 }
  ]

  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.list(1, 10);
    this.userDropDown();
  }

  userDropDown() {
    this.spinner.show();
    this.service.getservice({}, 'UserManagement/UsersDropDownList').subscribe(res => {
      console.log(res);
      this.userDropdownList = res.body.result;
      this.spinner.hide();
    })
  }

  list(offset: any, limit: any) {
    this.spinner.show();
    this.modal.pageIndex = offset;
    this.modal.pageSize = limit;
    this.service.PostService(this.modal, 'Account/GetLoginLogsList').subscribe(res => {
      console.log(res);
      this.length = res.body.totalCount;
      this.userList = res.body.result;
      this.spinner.hide();
    })
  }
  getPage(event: any) {
    let offset;
    offset = event.pageIndex + 1;
    this.TableIndex = event.pageIndex * event.pageSize;
    this.list(offset, event.pageSize);
  }
  clearFilter() {
    this.modal = {
      "UserId": 0, //filter
      "LoginStatusCode": 0, //filter
      "LoginTime": null //filter
    }
    this.list(1, 10)
  }
}
