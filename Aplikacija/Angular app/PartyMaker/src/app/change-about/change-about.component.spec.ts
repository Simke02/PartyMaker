import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAboutComponent } from './change-about.component';

describe('ChangeAboutComponent', () => {
  let component: ChangeAboutComponent;
  let fixture: ComponentFixture<ChangeAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAboutComponent]
    });
    fixture = TestBed.createComponent(ChangeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
