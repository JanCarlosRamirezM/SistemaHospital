import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {
  private _ocultarModal: boolean = false;
  public tipo: 'usuarios' | 'medicos' | 'hospitales';
  public id: string;
  public img: string;
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get ocultarModal() {
    return this._ocultarModal;
  }

  cerrarModal() {
    this._ocultarModal = false;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id: string, img: string = 'no-img') {
    this._ocultarModal = true;
    this.tipo = tipo;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }
}
