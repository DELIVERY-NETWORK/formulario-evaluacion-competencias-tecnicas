import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  flagPage: boolean = false;

  formDatos! : FormGroup;


  constructor() {}

  changeFlagPage() {
    this.flagPage = !this.flagPage;
  }

  setFormDatos(formDatos: FormGroup) {
    this.formDatos = formDatos;
  }

  getFormDatos() {
    return this.formDatos;
  }
}
