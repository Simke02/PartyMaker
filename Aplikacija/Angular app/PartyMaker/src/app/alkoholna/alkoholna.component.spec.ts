import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlkoholnaComponent } from './alkoholna.component';

describe('AlkoholnaComponent', () => {
  let component: AlkoholnaComponent;
  let fixture: ComponentFixture<AlkoholnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlkoholnaComponent]
    });
    fixture = TestBed.createComponent(AlkoholnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
