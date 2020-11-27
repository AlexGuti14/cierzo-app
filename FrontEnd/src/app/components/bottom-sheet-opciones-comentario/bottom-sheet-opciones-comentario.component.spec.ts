import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetOpcionesComentarioComponent } from './bottom-sheet-opciones-comentario.component';

describe('BottomSheetOpcionesComentarioComponent', () => {
  let component: BottomSheetOpcionesComentarioComponent;
  let fixture: ComponentFixture<BottomSheetOpcionesComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetOpcionesComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetOpcionesComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
