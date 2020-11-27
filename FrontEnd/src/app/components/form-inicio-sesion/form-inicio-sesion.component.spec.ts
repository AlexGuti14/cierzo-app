import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInicioSesionComponent } from './form-inicio-sesion.component';

describe('FormInicioSesionComponent', () => {
  let component: FormInicioSesionComponent;
  let fixture: ComponentFixture<FormInicioSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInicioSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInicioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
