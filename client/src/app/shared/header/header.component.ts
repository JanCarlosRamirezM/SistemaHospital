import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public imgUrl = '';

  constructor(private usuarioService: UsuarioService) {
    this.imgUrl = usuarioService.usuario.imagenUrl;
    console.log(    this.imgUrl);

  }

  logout() {
    this.usuarioService.logout();
  }
}
