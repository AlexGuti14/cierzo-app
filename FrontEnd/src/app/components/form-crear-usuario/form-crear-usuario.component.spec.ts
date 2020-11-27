import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearUsuarioComponent } from './form-crear-usuario.component';

describe('FormCrearUsuarioComponent', () => {
  let component: FormCrearUsuarioComponent;
  let fixture: ComponentFixture<FormCrearUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCrearUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
