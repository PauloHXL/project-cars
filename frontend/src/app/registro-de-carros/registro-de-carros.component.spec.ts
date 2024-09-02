import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeCarrosComponent } from './registro-de-carros.component';

describe('RegistroDeCarrosComponent', () => {
  let component: RegistroDeCarrosComponent;
  let fixture: ComponentFixture<RegistroDeCarrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroDeCarrosComponent]
    });
    fixture = TestBed.createComponent(RegistroDeCarrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
