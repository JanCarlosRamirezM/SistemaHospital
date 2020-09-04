import { FormBuilder } from '@angular/forms';
import { ModalImagenService } from './../../services/modal-imagen.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalimagen',
  templateUrl: './modalimagen.component.html',
  styles: [],
})
export class ModalimagenComponent implements OnInit {
  public imagenSubir: File;
  public usuario: Usuario;
  public imgTemp: any = null;

  constructor(
    public modalImagenService: ModalImagenService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  cambiarImagen(file) {
    this.imagenSubir = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const render = new FileReader();
    render.readAsDataURL(file);

    render.onloadend = () => {
      this.imgTemp = render.result;
    };
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((img) => {
        this.modalImagenService.cerrarModal();
        this.modalImagenService.nuevaImagen.emit(img);
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
