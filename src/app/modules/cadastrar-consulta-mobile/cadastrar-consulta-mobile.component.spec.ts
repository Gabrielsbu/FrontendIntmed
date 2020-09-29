import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarConsultaMobileComponent } from './cadastrar-consulta-mobile.component';

describe('CadastrarConsultaMobileComponent', () => {
  let component: CadastrarConsultaMobileComponent;
  let fixture: ComponentFixture<CadastrarConsultaMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarConsultaMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarConsultaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
