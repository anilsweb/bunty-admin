import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.abc()
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
