import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConsultaService } from './../../cors/services/service/consulta.service';
import { ConsultaMobile } from './../../cors/services/model/consultasMobile.model';
import Swal from 'sweetalert2';

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
    private _serviceConsulta: ConsultaService,
    private _router: Router
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

  excluirConsulta() {
    this._serviceConsulta.deletarConsulta(this.id).subscribe(
      (data) => {
        Swal.fire(
          'Sua consulta foi desmarcada com sucesso!',
          'Obrigado',
          'success'
        );
        this._router.navigate(['/consults']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
