import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeperformancesComponent } from './employeeperformances.component';

describe('EmployeeperformancesComponent', () => {
  let component: EmployeeperformancesComponent;
  let fixture: ComponentFixture<EmployeeperformancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeperformancesComponent]
    });
    fixture = TestBed.createComponent(EmployeeperformancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
