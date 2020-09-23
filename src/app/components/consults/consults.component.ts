import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalConsultsComponent } from './../modal-consults/modal-consults.component';

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
  displayedColumns: string[] = [
    'especialidade',
    'profissional',
    'data',
    'hora',
    'acoes',
  ];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalConsultsComponent, {
      width: '700px',
    });
  }

  funcao() {
    console.log('ola');
  }

  ngOnInit(): void {}
}
