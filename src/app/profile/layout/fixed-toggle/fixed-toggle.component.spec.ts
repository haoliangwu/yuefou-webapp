import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedToggleComponent } from './fixed-toggle.component';

describe('FixedToggleComponent', () => {
  let component: FixedToggleComponent;
  let fixture: ComponentFixture<FixedToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
