import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityDialogComponent } from './create-activity-dialog.component';

describe('CreateActivityDialogComponent', () => {
  let component: CreateActivityDialogComponent;
  let fixture: ComponentFixture<CreateActivityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
