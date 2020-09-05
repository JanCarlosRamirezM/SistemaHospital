import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../models/usuario.model';

import { environment } from './../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.getToken,
      },
    };
  }

  private trasformarUsuarios(resultado: any[]): Usuario[] {
    return resultado.map(
      (user) =>
        new Usuario(
          user.nombre,
          user.email,
          '',
          user.img,
          user.google,
          user.role,
          user.uid
        )
    );
  }

  private trasformarHospital(resultados: any[]): Hospital[] {
    return resultados;
  }

  private trasformarMedico(resultados: any[]): Medico[] {
    return resultados;
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.trasformarUsuarios(resp.resultado);

          case 'hospitales':
            return this.trasformarHospital(resp.resultado);

          case 'medicos':
            return this.trasformarMedico(resp.resultado);

          default:
            return [];
        }
      })
    );
  }
}
