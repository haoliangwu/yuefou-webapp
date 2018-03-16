import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendActivityComponent } from './attend-activity.component';

describe('AttendActivityComponent', () => {
  let component: AttendActivityComponent;
  let fixture: ComponentFixture<AttendActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
