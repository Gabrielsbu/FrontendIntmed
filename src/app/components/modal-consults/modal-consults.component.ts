import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ConsultaService } from './../../services/service/consulta.service';
import { AgendaService } from './../../services/service/agenda.service';
import { Agenda } from './../../services/model/agenda.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-consults',
  templateUrl: './modal-consults.component.html',
  styleUrls: ['./modal-consults.component.css'],
})
export class ModalConsultsComponent implements OnInit {
  agenda: Agenda[];

  public consultaForm: FormGroup;

  constructor(
    private httpService: AgendaService,
    private http: ConsultaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.consultaForm = this.formBuilder.group({
      profissional: '',
      especialidade: '',
      dia: '',
      horarios: '',
    });

    this.buscarAgenda();
  }

  buscarAgenda() {
    this.httpService.buscarAgenda().subscribe(
      (data) => {
        this.agenda = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  criarConsulta() {
    this.http.createConsult(this.consultaForm.value).subscribe(
      (data) => {
        Swal.fire(
          'Cadastro realizado com sucesso!',
          `Seja bem vindo a Medicar`,
          'success'
        );
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'Ops, algo de errado não está certo!',
          'Verifique os campos novamente!',
          'error'
        );
      }
    );
    this.consultaForm.reset();
  }
}
