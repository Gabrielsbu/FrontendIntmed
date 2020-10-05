import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadeService {
  apiUrl = 'http://127.0.0.1:8000/medcarapi';

  constructor(private _http: HttpClient) {}

  public buscarEspecialidades(): Observable<any> {
    return this._http.get(this.apiUrl + '/especialidades');
  }
  public buscarMedicos(): Observable<any> {
    return this._http.get(this.apiUrl + '/medicos');
  }
}
