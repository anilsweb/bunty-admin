import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UpiComponent } from './upi/upi.component';
import { CryptoComponent } from './crypto/crypto.component';
import { PaymentTimerComponent } from './payment-timer/payment-timer.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCongestedComponent } from './payment-congested/payment-congested.component';
import { AllTransactionComponent } from './all-transaction/all-transaction.component';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { KycComponent } from './kyc/kyc.component';
import { P2pComponent } from './p2p/p2p.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { PhoneVerifyComponent } from './phone-verify/phone-verify.component';
import { SettingComponent } from './setting/setting.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CryptoWalletComponent } from './crypto-wallet/crypto-wallet.component';
import { P2pNotificationComponent } from './p2p-notification/p2p-notification.component';
import { P2pNotificationInformationComponent } from './p2p-notification-information/p2p-notification-information.component';
const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UpiComponent,
    CryptoComponent,
    PaymentTimerComponent,
    PaymentSuccessComponent,
    PaymentCongestedComponent,
    AllTransactionComponent,
    ChatComponent,
    ChatListComponent,
    KycComponent,
    P2pComponent,
    PaymentComponent,
    PaymentFailedComponent,
    PhoneVerifyComponent,
    SettingComponent,
    WithdrawalRequestComponent,
    CryptoWalletComponent,
    P2pNotificationComponent,
    P2pNotificationInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
