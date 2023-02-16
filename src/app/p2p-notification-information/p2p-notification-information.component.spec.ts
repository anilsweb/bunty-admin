import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pNotificationInformationComponent } from './p2p-notification-information.component';

describe('P2pNotificationInformationComponent', () => {
  let component: P2pNotificationInformationComponent;
  let fixture: ComponentFixture<P2pNotificationInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pNotificationInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P2pNotificationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
