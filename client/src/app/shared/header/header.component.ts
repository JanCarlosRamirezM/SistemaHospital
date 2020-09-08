import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

  busquedaGeneral(termino: string) {
    if (termino.length === 0) {
      return this.router.navigateByUrl(`/dashboard`);
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
