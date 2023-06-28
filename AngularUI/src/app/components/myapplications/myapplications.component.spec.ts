import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyapplicationsComponent } from './myapplications.component';

describe('MyapplicationsComponent', () => {
  let component: MyapplicationsComponent;
  let fixture: ComponentFixture<MyapplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyapplicationsComponent]
    });
    fixture = TestBed.createComponent(MyapplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
