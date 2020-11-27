import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetEliminarCuentaAdminComponent } from './bottom-sheet-eliminar-cuenta-admin.component';

describe('BottomSheetEliminarCuentaAdminComponent', () => {
  let component: BottomSheetEliminarCuentaAdminComponent;
  let fixture: ComponentFixture<BottomSheetEliminarCuentaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetEliminarCuentaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetEliminarCuentaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
