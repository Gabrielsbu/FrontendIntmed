import { Component, Inject, OnInit } from '@angular/core';

import { ConsultaService } from './../../../cors/services/service/consulta.service';
import { Agenda } from './../../../cors/services/model/agenda.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Especialidade } from './../../../cors/services/model/especialidade.model';
import { EspecialidadeService } from './../../../cors/services/service/especialidade.service';

import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/cors/services/model/consultas.model';

@Component({
  selector: 'app-modal-consults',
  templateUrl: './modal-consults.component.html',
  styleUrls: ['./modal-consults.component.css'],
})
export class ModalConsultsComponent implements OnInit {
  agendas: Agenda[];
  especialidades: Especialidade[];

  public consultaForm: FormGroup;

  medicosPorEspecialidade: Agenda[];
  medicoSelecionado: Agenda;

  medico: string;

  constructor(
    private _consultaService: ConsultaService,
    private _formBuilder: FormBuilder,
    private _especialidadeService: EspecialidadeService,
    public dialogRef: MatDialogRef<ModalConsultsComponent>
  ) {}

  ngOnInit(): void {
    this.buscarConsultas();
    this.getEspecialidades();
    this.consultaForm = this._formBuilder.group({
      agenda: ['', [Validators.required]],
      especialidade: ['', Validators.required],
      dia: ['', Validators.required],
      horario: ['', [Validators.required]],
    });
  }

  public getEspecialidades() {
    this._especialidadeService.buscarEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
        console.log('algo');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarConsultas() {
    this._consultaService.buscarAgenda().subscribe(
      (data) => {
        this.agendas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  criarConsulta() {
    let agenda: Agenda = this.consultaForm.controls['agenda'].value;
    let horario: string = this.consultaForm.controls['horario'].value;

    this._consultaService
      .criarConsulta({ agenda: agenda.id, horario: horario })
      .subscribe(
        (data: Consulta) => {
          this.dialogRef.close(data);
          Swal.fire(
            'Cadastro realizado com sucesso!',
            `Seja bem vindo a Medicar`,
            'success'
          );
        },
        (error) => {
          Swal.fire(
            'Verifique as credenciais inseridas e preencha todos os campos!',
            'Verifique os campos novamente!',
            'error'
          );
        }
      );
  }

  public getMedicosPorEspecialidade(especialidade: Especialidade) {
    this.medicosPorEspecialidade = this.agendas.filter(
      (e) => e.medico.especialidade.nome === especialidade.nome
    );
  }
}
