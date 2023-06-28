import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewleaveapplicationComponent } from './viewleaveapplication.component';

describe('ViewleaveapplicationComponent', () => {
  let component: ViewleaveapplicationComponent;
  let fixture: ComponentFixture<ViewleaveapplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewleaveapplicationComponent]
    });
    fixture = TestBed.createComponent(ViewleaveapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
