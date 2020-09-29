import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalhadaComponent } from './consulta-detalhada.component';

describe('ConsultaDetalhadaComponent', () => {
  let component: ConsultaDetalhadaComponent;
  let fixture: ComponentFixture<ConsultaDetalhadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDetalhadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDetalhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
