import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-api-url',
  templateUrl: './api-url.component.html',
  styleUrls: ['./api-url.component.scss']
})
export class ApiUrlComponent implements OnInit {
  model: any;
  constructor(
    private service: CommonService,
    private spinner: NgxSpinnerService,
  ) { 
    this.spinner.show();
    this.service.getservice({}, 'Settings/GetAppUrl').subscribe(res => {
      this.spinner.hide();
        this.model = res.body.result;
    })
    
  }

  ngOnInit(): void {
  }

}
