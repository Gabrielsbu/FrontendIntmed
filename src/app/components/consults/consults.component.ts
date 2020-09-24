import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalConsultsComponent } from './../modal-consults/modal-consults.component';
import { AuthenticationService } from './../../services/service/authentication.service';

import { User } from './../../services/model/user.model';

export interface PeriodicElement {
  especialidade: string;
  profissional: string;
  data: string;
  hora: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    especialidade: 'Dentista',
    profissional: 'Hydrogen',
    data: '11/12/2010',
    hora: '13:30',
  },
  {
    especialidade: 'Dentista',
    profissional: 'Helium',
    data: '10/12/1992',
    hora: '15:30',
  },
];

@Component({
  selector: 'app-consults',
  templateUrl: './consults.component.html',
  styleUrls: ['./consults.component.css'],
})
export class ConsultsComponent implements OnInit {
  users: User[];

  displayedColumns: string[] = [
    'especialidade',
    'profissional',
    'data',
    'hora',
    'acoes',
  ];
  dataSource = ELEMENT_DATA;

  constructor(
    public dialog: MatDialog,
    private services: AuthenticationService
  ) {}

  openDialog() {
    this.dialog.open(ModalConsultsComponent, {
      width: '700px',
    });
  }

  ngOnInit(): void {}
}
