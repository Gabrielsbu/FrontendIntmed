import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  api = 'http://127.0.0.1:8000/medcarapi';

  constructor(private http: HttpClient) {}

  public buscarAgenda(): Observable<any> {
    return this.http.get(this.api + '/agenda/');
  }
}
