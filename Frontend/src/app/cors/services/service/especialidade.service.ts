import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadeService {
  apiUrl = `${environment.API}/medcarapi`;

  constructor(private _http: HttpClient) {}

  public buscarEspecialidades(): Observable<any> {
    return this._http.get(this.apiUrl + '/especialidades/');
  }
  public buscarMedicos(): Observable<any> {
    return this._http.get(this.apiUrl + '/medicos/');
  }
}
