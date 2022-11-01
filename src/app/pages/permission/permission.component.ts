import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ModalComponent } from 'src/app/@common/modal/modal.component';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

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
    this.service.getservice({}, 'UserRoles/RolePermissionList').subscribe(res => {
      console.log(res);
      this.spinner.hide();
      this.catList = res.body.result;
    })
  }

}
