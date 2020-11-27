import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetEliminarCuentaComponent } from './bottom-sheet-eliminar-cuenta.component';

describe('BottomSheetEliminarCuentaComponent', () => {
  let component: BottomSheetEliminarCuentaComponent;
  let fixture: ComponentFixture<BottomSheetEliminarCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetEliminarCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetEliminarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
