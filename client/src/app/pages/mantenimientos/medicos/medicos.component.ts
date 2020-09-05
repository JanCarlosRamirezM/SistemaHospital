import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { MedicoService } from './../../../services/medico.service';
import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [],
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando = false;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public imgSubs: Subscription;

  constructor(
    private medicoService: MedicoService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(() => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos) => {
      this.cargando = false;
      this.medicos = medicos;
      this.medicosTemp = medicos;
    });
  }

  buscarMedico(termino: string) {
    if (termino.trim().length === 0) {
      return (this.medicos = this.medicosTemp);
    }

    this.busquedasService
      .buscar('medicos', termino)
      .subscribe((medico: Medico[]) => {
        this.medicos = medico;
      });
  }

  actualizarMedico(medico: Medico) {
    console.log(medico._id);
  }

  eliminarMedico(medico: Medico) {
    this.medicoService.eliminarMedico(medico._id).subscribe((resp) => {
      this.cargarMedicos();
      Swal.fire('Eliminado', medico.nombre, 'success');
    });
  }

  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }
}
