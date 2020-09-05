import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { HospitalService } from './../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from './../../../services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [],
})
export class MedicoComponent implements OnInit {
  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalesSelect: Hospital;
  public medicoSelect: Medico;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerIdDesdeUrl();

    this.medicoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      hospital: ['', [Validators.required]],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges.subscribe((hospitalID) => {
      this.hospitalesSelect = this.hospitales.find(
        (hosp) => hosp._id === hospitalID
      );
    });
  }

  cargarHospitales() {
    this.hospitalService
      .cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico() {
    if (this.medicoForm.invalid) {
      return;
    }

    const { nombre } = this.medicoForm.value;

    if (this.medicoSelect) {
      // Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelect._id,
      };
      this.medicoService.actualizarMedico(data).subscribe((resp: any) => {
        Swal.fire(
          'Actualizado',
          `${nombre} actualizado correctamente`,
          'success'
        );
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
      });
    } else {
      // Crear
      this.medicoService
        .crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });
    }
  }

  obtenerIdDesdeUrl() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);
    });
  }

  cargarMedico(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.medicoService
      .buscarMedicoPorId(id)
      .pipe(delay(100))
      .subscribe((medico) => {
        if (!medico) {
          return this.router.navigateByUrl('/dashboard/medicos/');
        }

        const {
          nombre,
          hospital: { _id },
        } = medico;
        this.medicoSelect = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });
  }
}
