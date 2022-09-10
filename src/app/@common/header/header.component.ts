import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private service: CommonService,
  ) { }

  ngOnInit(): void {
    this.service.getservice({}, 'Settings/GetWebsiteGeneralDetails').subscribe(res => {
      console.log(res);
      this.service.genralDetail.next(res.body.result);
    })
  }

}
