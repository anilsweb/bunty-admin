import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/@services/api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    // this.abc()
    this.getParentData();
  }

  getParentData() {
    const payload = {
      "access_key": "hdwokidjqswdepoqkkwkjdeqwpdojwPW",
      "auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJmYXN0dGFnZyIsImlhdCI6MTUxNjIzOTAyMn0.QWy8X9bmGvGbcdeN1TYth2vCRkk2Ik55qQ4sgueGIq4",
      "origin": "testsiterr.com",
      "userid": 456,
      "username": "fasttagg"
    }
    this.apiService.post(payload, 'verifyMerchant').subscribe(res => {
      if (!res?.error) {
        localStorage.setItem('userData', JSON.stringify(res?.data));
      }
    })
  }

  abc() {
    var evt = new CustomEvent("paymentResult", {});
    window.dispatchEvent(evt);

    /* window.addEventListener('topup', function (e) {
      console.log(e.detail)
      let rozerData = JSON.parse(localStorage.getItem('allSetting') || '{}');
      var amount = e.detail.amount;
      var options = {
        key: rozerData.rozerpay_key,
        amount: amount * 100,
        name: rozerData.app_name,
        description: 'Jyotishi Payment',
        image: rozerData.logo,
        currency: "INR",

        order_id: e.detail.order.id,
        handler: demoSuccessHandler
      }
      window.r = new Razorpay(options);
      r.open()
    }) */
  }

}
