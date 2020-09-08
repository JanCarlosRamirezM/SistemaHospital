import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Medico } from './../../models/medico.model';
import { Hospital } from './../../models/hospital.model';
import { Usuario } from './../../models/usuario.model';
import { BusquedasService } from './../../services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
  ) {}

  ngOnInit(): void {
    this.obtenerTerminoDesdeUrl();
  }

  obtenerTerminoDesdeUrl() {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedasService.busquedaGeneral(termino).subscribe((resp: any) => {
        this.usuarios = resp.usuarios;
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
      });
    });
  }
}
