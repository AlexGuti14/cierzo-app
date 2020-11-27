import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaUsuarioBaneadoComponent } from './tarjeta-usuario-baneado.component';

describe('TarjetaUsuarioBaneadoComponent', () => {
  let component: TarjetaUsuarioBaneadoComponent;
  let fixture: ComponentFixture<TarjetaUsuarioBaneadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaUsuarioBaneadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaUsuarioBaneadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
