import { Component, OnInit } from '@angular/core';

import { EspecialidadesService } from './../../services/service/especialidades.service';
import { Especialidade } from './../../services/model/especialidade.model';
import { Medico } from './../../services/model/medico.model';

@Component({
  selector: 'app-modal-consults',
  templateUrl: './modal-consults.component.html',
  styleUrls: ['./modal-consults.component.css'],
})
export class ModalConsultsComponent implements OnInit {
  especialidade: Especialidade[];
  medico: Medico[];

  constructor(private httpService: EspecialidadesService) {}

  ngOnInit(): void {
    this.buscarEspecialidades();
    this.buscarMedico();
  }

  buscarEspecialidades() {
    this.httpService.buscarEspecialidades().subscribe(
      (data) => {
        this.especialidade = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarMedico() {
    this.httpService.buscarMedicos().subscribe(
      (data) => {
        this.medico = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
