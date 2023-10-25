import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorCompComponent } from './administrator-comp.component';

describe('AdministratorCompComponent', () => {
  let component: AdministratorCompComponent;
  let fixture: ComponentFixture<AdministratorCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorCompComponent]
    });
    fixture = TestBed.createComponent(AdministratorCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
