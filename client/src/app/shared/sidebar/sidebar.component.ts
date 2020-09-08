import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  usuario: Usuario;
  constructor(
    public sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {}
}
