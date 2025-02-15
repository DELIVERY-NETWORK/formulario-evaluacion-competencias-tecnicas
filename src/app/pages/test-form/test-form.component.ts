import { Component } from '@angular/core';
import { ConocimientosProgramacionComponent } from "./components/conocimientos-programacion/conocimientos-programacion.component";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [ConocimientosProgramacionComponent],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export default class TestFormComponent {
  title = 'Formulario de Evaluación de Competencias Técnicas';

  miFormularioLenguageProgramacion!: FormGroup;

  constructor() {}

  updateFormularioLenguageProgramacion(form:FormGroup): void {
    debugger
    this.miFormularioLenguageProgramacion = form;
  }
}
