import { Time } from '@angular/common';
import { Medico } from './medico.model';

export interface Agenda {
  medico: Medico;
  dia: Date;
  id: number;
  horarios: Time[];
}
