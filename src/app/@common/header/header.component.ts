import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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
  genData: any;
  favIcon: any = document.querySelector('#favIcon')


  constructor(
    public router: Router,
    private titleService: Title,
    private service: CommonService,
  ) {
    this.service.genralDetail.subscribe(res => {
      this.genData = res;
      this.titleService.setTitle(this.genData.title);
      this.favIcon.href = this.genData?.favicon ? this.genData?.favicon : '/assets/images/dummy.png';
    })


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
