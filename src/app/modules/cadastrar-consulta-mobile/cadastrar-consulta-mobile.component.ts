import { Router } from '@angular/router';
import { Consulta } from 'src/app/cors/services/model/consultas.model';
import { EspecialidadeService } from './../../cors/services/service/especialidade.service';
import { ConsultaService } from './../../cors/services/service/consulta.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Especialidade } from './../../cors/services/model/especialidade.model';
import { Component, OnInit } from '@angular/core';
import { Agenda } from 'src/app/cors/services/model/agenda.model';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-cadastrar-consulta-mobile',
  templateUrl: './cadastrar-consulta-mobile.component.html',
  styleUrls: ['./cadastrar-consulta-mobile.component.css'],
})
export class CadastrarConsultaMobileComponent implements OnInit {
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
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buscarConsultas();
    this.consultaForm = this._formBuilder.group({
      agenda: ['', [Validators.required]],
      especialidade: ['', Validators.required],
      dia: ['', Validators.required],
      horario: ['', [Validators.required]],
    });
    this.getEspecialidades();
  }

  buscarConsultas() {
    this._consultaService.buscarAgenda().subscribe(
      (data) => {
        this.agendas = data;
        console.log('Agendas retornadas: ', data);
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
          Swal.fire(
            'Cadastro realizado com sucesso!',
            `Seja bem vindo a Medicar`,
            'success'
          );

          this._router.navigate(['/consults']);
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

  public getMedicosPorEspecialidade(especialidade: Especialidade) {
    this.medicosPorEspecialidade = this.agendas.filter(
      (e) => e.medico.especialidade.nome === especialidade.nome
    );
  }
}
