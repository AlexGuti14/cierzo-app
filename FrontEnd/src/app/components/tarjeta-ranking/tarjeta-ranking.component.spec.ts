import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaRankingComponent } from './tarjeta-ranking.component';

describe('TarjetaRankingComponent', () => {
  let component: TarjetaRankingComponent;
  let fixture: ComponentFixture<TarjetaRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
