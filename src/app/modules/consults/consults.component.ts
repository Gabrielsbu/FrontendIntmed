import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalConsultsComponent } from './modal-consults/modal-consults.component';
import { AuthenticationService } from './../../cors/services/service/authentication.service';
import { ConsultaService } from './../../cors/services/service/consulta.service';
import { Consulta } from './../../cors/services/model/consultas.model';
import { Usuario } from './../../cors/services/model/usuario.model';

import Swal from 'sweetalert2';

export interface PeriodicElement {
  especialidade: string;
  profissional: string;
  data: string;
  hora: string;
}

@Component({
  selector: 'app-consults',
  templateUrl: './consults.component.html',
  styleUrls: ['./consults.component.css'],
})
export class ConsultsComponent implements OnInit {
  consulta: Consulta[];
  usuarioLogado: Usuario;
  displayedColumns: string[] = [
    'especialidade',
    'profissional',
    'data',
    'hora',
    'acoes',
  ];
  dataSource: Consulta[] = [];

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _buscarConsultas: ConsultaService,
    private _buscarUsuario: AuthenticationService
  ) {}

  openDialog() {
    this.dialog
      .open(ModalConsultsComponent, {
        width: '700px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (!!res) {
          this.buscarConsultas();
        }
      });
  }

  ngOnInit(): void {
    this.buscarConsultas();
    this.buscarConsultasMobile();
    this.buscarUsuario();
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/']);
  }

  buscarConsultasMobile() {
    this._buscarConsultas.buscarConsulta().subscribe(
      (data) => {
        this.consulta = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarConsultas() {
    this._buscarConsultas.buscarConsulta().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  excluirConsulta(id) {
    this._buscarConsultas.deletarConsulta(id).subscribe(
      (data) => {
        Swal.fire(
          'Sua consulta foi desmarcada com sucesso!',
          'Obrigado',
          'success'
        );
        this.consulta = this.consulta.filter((e) => e.id != id);
        this.buscarConsultas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarUsuario() {
    this._buscarUsuario.buscarUsuario().subscribe(
      (data) => {
        this.usuarioLogado = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
