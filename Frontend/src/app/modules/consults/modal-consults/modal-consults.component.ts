import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { ConsultaService } from './../../../cors/services/service/consulta.service';
import { EspecialidadeService } from './../../../cors/services/service/especialidade.service';

import { Agenda } from './../../../cors/services/model/agenda.model';
import { Especialidade } from './../../../cors/services/model/especialidade.model';
import { Medico } from './../../../cors/services/model/medico.model';
import { Consulta } from 'src/app/cors/services/model/consultas.model';

@Component({
  selector: 'app-modal-consults',
  templateUrl: './modal-consults.component.html',
  styleUrls: ['./modal-consults.component.css'],
})
export class ModalConsultsComponent implements OnInit {
  agendas: Agenda[];
  especialidades: Especialidade[];
  medicos: Medico[];

  public consultaForm: FormGroup;
  public agendaForm: FormGroup;

  medicosPorEspecialidade: Medico[];
  agendaPorMedico: Agenda[];
  medicoSelecionado: Agenda;
  agendaSelecionada: Agenda;

  constructor(
    private _consultaService: ConsultaService,
    private _especialidadeService: EspecialidadeService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalConsultsComponent>
  ) {}

  ngOnInit(): void {
    this.buscarConsultas();
    this.getEspecialidades();
    this.getMedicos();

    this.consultaForm = this._formBuilder.group({
      horario: ['', Validators.required],
      profissional: ['', [Validators.required]],
      especialidade: ['', Validators.required],
      dia: ['', Validators.required],
    });
  }
  public getEspecialidades() {
    this._especialidadeService.buscarEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public getMedicos() {
    this._especialidadeService.buscarMedicos().subscribe(
      (data) => {
        this.medicos = data;
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

  public getMedicosPorEspecialidade(especialidade: Especialidade) {
    this.medicosPorEspecialidade = this.medicos.filter(
      (e) => e.especialidade.nome === especialidade.nome
    );
  }

  public getAgendaPorMedicos(medico: Medico) {
    this.agendaPorMedico = this.agendas.filter(
      (e) => e.medico.nome === medico.nome
    );
  }

  criarConsulta() {
    const horario: string = this.consultaForm.controls['horario'].value;
    const agenda: Agenda = this.consultaForm.controls['dia'].value;

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
}
