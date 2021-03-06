import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from './../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { titulo: 'Dashboard' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { titulo: 'ProgressBar' },
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: { titulo: 'Gráfica #1' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { titulo: 'Ajustes de cuenta' },
  },
  {
    path: 'promesas',
    component: PromesasComponent,
    data: { titulo: 'Promesas' },
  },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: { titulo: 'Perfil' },
  },
  {
    path: 'buscar/:termino',
    component: BusquedaComponent,
    data: { titulo: 'Busquedas' },
  },
  // Mantenimientos
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: { titulo: 'Mantenimientos Hospitales' },
  },
  {
    path: 'medicos',
    component: MedicosComponent,
    data: { titulo: 'Mantenimientos Medicos' },
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: { titulo: 'Actualizar Medicos' },
  },
  {
    path: 'medico/nuevo',
    component: MedicoComponent,
    data: { titulo: 'Crear Medicos' },
  },

  // Rutas de Admin
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: { titulo: 'Mantenimientos Usuarios' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
