import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosBaneadosComponent } from './usuarios-baneados.component';

describe('UsuariosBaneadosComponent', () => {
  let component: UsuariosBaneadosComponent;
  let fixture: ComponentFixture<UsuariosBaneadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosBaneadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosBaneadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
