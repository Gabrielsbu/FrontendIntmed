import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConsultaService } from './../../cors/services/service/consulta.service';
import { ConsultaMobile } from './../../cors/services/model/consultasMobile.model';

@Component({
  selector: 'app-consulta-detalhada',
  templateUrl: './consulta-detalhada.component.html',
  styleUrls: ['./consulta-detalhada.component.css'],
})
export class ConsultaDetalhadaComponent implements OnInit {
  id: string;
  consulta: ConsultaMobile;
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _serviceConsulta: ConsultaService
  ) {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log('id', this.id);
    });
  }

  ngOnInit(): void {
    this.buscarConsulta();
  }

  buscarConsulta() {
    this._serviceConsulta.consultarPorUm(this.id).subscribe(
      (data) => {
        this.consulta = data;
      },
      (error) => {
        error;
      }
    );
  }
}
