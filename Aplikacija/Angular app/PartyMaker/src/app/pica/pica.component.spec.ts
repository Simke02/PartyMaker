import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicaComponent } from './pica.component';

describe('PicaComponent', () => {
  let component: PicaComponent;
  let fixture: ComponentFixture<PicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PicaComponent]
    });
    fixture = TestBed.createComponent(PicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
