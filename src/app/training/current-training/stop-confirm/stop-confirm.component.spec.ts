import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopConfirmComponent } from './stop-confirm.component';

describe('StopConfirmComponent', () => {
  let component: StopConfirmComponent;
  let fixture: ComponentFixture<StopConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
