import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: any;
  user: any;
  userSub: any;
  userObj: any;

  constructor(
    private service: CommonService,
  ) {



  }

  ngOnInit(): void {
    this.service.loginUserName.subscribe(res => {
      this.userSub = res;
      if (this.userSub?.name) {
        this.userName = this.userSub?.name;
        console.log(this.userName);
      } else {
        this.userObj = localStorage.getItem('loginData');
        const userData = JSON.parse(this.userObj);
        this.userName = userData?.name;
        console.log(this.userName);

      }
    })
    this.service.getservice({}, 'Settings/GetWebsiteGeneralDetails').subscribe(res => {
      console.log(res);
      this.service.genralDetail.next(res.body.result);
    })
  }

}
