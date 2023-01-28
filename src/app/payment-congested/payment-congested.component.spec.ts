import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCongestedComponent } from './payment-congested.component';

describe('PaymentCongestedComponent', () => {
  let component: PaymentCongestedComponent;
  let fixture: ComponentFixture<PaymentCongestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCongestedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCongestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
