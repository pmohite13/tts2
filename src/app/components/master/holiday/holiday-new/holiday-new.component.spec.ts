import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayNewComponent } from './holiday-new.component';

describe('HolidayNewComponent', () => {
  let component: HolidayNewComponent;
  let fixture: ComponentFixture<HolidayNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
