import { Medico } from './medico.model';
import { Time } from '@angular/common';
export class Consulta {
  id: number;
  dia: Date;
  horario: Time;
  medico: Medico;
}
