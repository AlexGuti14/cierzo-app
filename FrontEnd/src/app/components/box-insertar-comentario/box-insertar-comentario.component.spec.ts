import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInsertarComentarioComponent } from './box-insertar-comentario.component';

describe('BoxInsertarComentarioComponent', () => {
  let component: BoxInsertarComentarioComponent;
  let fixture: ComponentFixture<BoxInsertarComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxInsertarComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxInsertarComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
