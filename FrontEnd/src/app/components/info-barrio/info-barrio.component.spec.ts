import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBarrioComponent } from './info-barrio.component';

describe('InfoBarrioComponent', () => {
  let component: InfoBarrioComponent;
  let fixture: ComponentFixture<InfoBarrioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBarrioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBarrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
