import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUrlComponent } from './api-url.component';

describe('ApiUrlComponent', () => {
  let component: ApiUrlComponent;
  let fixture: ComponentFixture<ApiUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
