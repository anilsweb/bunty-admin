import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTimerComponent } from './payment-timer.component';

describe('PaymentTimerComponent', () => {
  let component: PaymentTimerComponent;
  let fixture: ComponentFixture<PaymentTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
