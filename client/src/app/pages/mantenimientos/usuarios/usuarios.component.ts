import { BusquedasService } from './../../../services/busquedas.service';
import { Usuario } from './../../../models/usuario.model';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalRegistros: number;
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;
  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => {
        this.cargarUsuarios();
      });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ usuarios, total }) => {
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.totalRegistros = total;
        this.cargando = false;
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

  buscar(terminoBusqueda: string) {
    if (terminoBusqueda.length === 0) {
      return (this.usuarios = this.usuariosTemp);
    }
    console.log(terminoBusqueda);

    this.busquedasService
      .buscar('usuarios', terminoBusqueda)
      .subscribe((resultados) => {
        this.usuarios = resultados;
      });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.getUsuarioUID) {
      return Swal.fire('Error', 'No puede eliminarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario eliminado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}
