import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  public formPerfil: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
