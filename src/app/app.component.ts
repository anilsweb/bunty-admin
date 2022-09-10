import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  genData: any;
  constructor(
    public router: Router,
    private titleService: Title,
    private service: CommonService,
  ) {
    this.service.genralDetail.subscribe(res => {
      this.genData = res;
      this.titleService.setTitle(this.genData.title);
    })
  }
}
