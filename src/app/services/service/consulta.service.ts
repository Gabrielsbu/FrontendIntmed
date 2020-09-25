import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Consulta } from './../model/consultas.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  api = 'http://127.0.0.1:8000/medcarapi';
  constructor(private http: HttpClient) {}

  public createConsult(consulta: any): Observable<Consulta> {
    return this.http.post<any>(this.api + '/consulta/', consulta);
  }
}
