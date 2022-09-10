import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent implements OnInit {

  modal = {
    "pageIndex": 1,
    "pageSize": 10,
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
    this.list();
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

  list() {
    this.spinner.show();
    this.service.PostService(this.modal, 'Account/GetLoginLogsList').subscribe(res => {
      console.log(res);
      this.userList = res.body.result;
      this.spinner.hide();
    })
  }

}
