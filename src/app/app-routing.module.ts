import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTransactionComponent } from './all-transaction/all-transaction.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatComponent } from './chat/chat.component';
import { CryptoWalletComponent } from './crypto-wallet/crypto-wallet.component';
import { CryptoComponent } from './crypto/crypto.component';
import { HomeComponent } from './home/home.component';
import { KycComponent } from './kyc/kyc.component';
import { P2pNotificationInformationComponent } from './p2p-notification-information/p2p-notification-information.component';
import { P2pNotificationComponent } from './p2p-notification/p2p-notification.component';
import { P2pComponent } from './p2p/p2p.component';
import { PaymentCongestedComponent } from './payment-congested/payment-congested.component';
import { PaymentFailedComponent } from './payment-failed/payment-failed.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentTimerComponent } from './payment-timer/payment-timer.component';
import { PaymentComponent } from './payment/payment.component';
import { PhoneVerifyComponent } from './phone-verify/phone-verify.component';
import { SettingComponent } from './setting/setting.component';
import { UpiComponent } from './upi/upi.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upi', component: UpiComponent },
  { path: 'crypto', component: CryptoComponent },
  { path: 'payment-timer', component: PaymentTimerComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-congested', component: PaymentCongestedComponent },
  { path: 'all-transaction', component: AllTransactionComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat-list', component: ChatListComponent },
  { path: 'kyc', component: KycComponent },
  { path: 'p2p', component: P2pComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  { path: 'phone-verify', component: PhoneVerifyComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'withdrawal-request', component: WithdrawalRequestComponent },
  { path: 'crypto-wallet', component: CryptoWalletComponent  },
  { path: 'p2p-notification', component: P2pNotificationComponent  },
  { path: 'p2p-notification-information', component: P2pNotificationInformationComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
