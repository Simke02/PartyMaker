import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BezalkoholnaComponent } from './bezalkoholna.component';

describe('BezalkoholnaComponent', () => {
  let component: BezalkoholnaComponent;
  let fixture: ComponentFixture<BezalkoholnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BezalkoholnaComponent]
    });
    fixture = TestBed.createComponent(BezalkoholnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
