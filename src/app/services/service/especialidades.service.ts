import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadesService {
  api = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient) {}

  public buscarEspecialidades(): Observable<any> {
    return this.http.get(this.api + '/especialidade/');
  }

  public buscarMedicos(): Observable<any> {
    return this.http.get(this.api + '/medicos/');
  }
}
