import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public totalRegistros: number;
  public desde: number = 0;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ usuarios, total }) => {
        this.usuarios = usuarios;
        this.totalRegistros = total;
      });
  }
  cambiarPagina(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalRegistros) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }
}
