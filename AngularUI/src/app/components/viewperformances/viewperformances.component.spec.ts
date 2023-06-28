import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewperformancesComponent } from './viewperformances.component';

describe('ViewperformancesComponent', () => {
  let component: ViewperformancesComponent;
  let fixture: ComponentFixture<ViewperformancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewperformancesComponent]
    });
    fixture = TestBed.createComponent(ViewperformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
