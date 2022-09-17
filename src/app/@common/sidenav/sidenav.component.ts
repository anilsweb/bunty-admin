import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  genData: any;
  constructor(
    private service: CommonService,
  ) {
    this.service.genralDetail.subscribe(res => {
      this.genData = res;
    })
  }
  ngOnInit(): void {
    
  }
}
