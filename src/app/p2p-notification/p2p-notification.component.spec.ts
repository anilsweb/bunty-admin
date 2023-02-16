import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P2pNotificationComponent } from './p2p-notification.component';

describe('P2pNotificationComponent', () => {
  let component: P2pNotificationComponent;
  let fixture: ComponentFixture<P2pNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P2pNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P2pNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
