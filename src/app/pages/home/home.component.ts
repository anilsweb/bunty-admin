import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.spinner.show();
    this.service.getservice({}, 'Master/GetDashboardData').subscribe(res => {
      console.log(res);
      this.spinner.hide();
      // this.catList = res.body.result;
    })
  }

}
