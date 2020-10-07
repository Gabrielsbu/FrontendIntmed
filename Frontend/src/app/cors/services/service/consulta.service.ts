import { Consulta } from './../model/consultas.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  api = environment.API;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public buscarAgenda(): Observable<any> {
    return this.http.get<any>(this.api + '/medcarapi/agendas/');
  }

  public buscarConsulta(): Observable<any> {
    return this.http.get<any>(this.api + '/medcarapi/buscar-consulta/');
  }

  public criarConsulta(consulta: any): Observable<Consulta> {
    return this.http.post<Consulta>(
      this.api + '/medcarapi/criar-consulta/',
      consulta,
      this.httpOptions
    );
  }

  public deletarConsulta(id): Observable<any> {
    return this.http.delete(
      this.api + '/medcarapi/delete-consulta/' + id + '/'
    );
  }

  public consultarPorUm(id): Observable<any> {
    return this.http.get(this.api + '/consultas/' + id + '/');
  }
}
