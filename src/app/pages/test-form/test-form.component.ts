import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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

  flagFormularioLenguageProgramacion: boolean = false;

  miFormularioLenguageProgramacion!: FormGroup;

  isProcessing: boolean = false;

  @ViewChild(ConocimientosProgramacionComponent)
  conocimientosProgramacionComponent!: ConocimientosProgramacionComponent;

  constructor() {}

  updateFormularioLenguageProgramacion(form: FormGroup): void {}

  async enviarForm() {
    this.isProcessing = true;

    this.flagFormularioLenguageProgramacion =
      !this.flagFormularioLenguageProgramacion;

    this.miFormularioLenguageProgramacion = await this.esperarRespuesta();

    if (this.miFormularioLenguageProgramacion.valid) {
      console.log('Formulario válido:', this.miFormularioLenguageProgramacion);

      if (this.formularioTieneInformacion(this.miFormularioLenguageProgramacion)) {
        console.log('Formulario tiene información');
      } else {
        console.log('Formulario no tiene información');
      }


    } else {
      console.log(
        'Formulario inválido:',
        this.miFormularioLenguageProgramacion
      );
    }

    this.isProcessing = false;
  }

  formularioTieneInformacion(formGroup: FormGroup): boolean {
    for (const controlName in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(controlName)) {
        const control = formGroup.get(controlName);
        if (control && control.value) {
          return true;
        }
      }
    }
    return false;
  }

  esperarRespuesta(): Promise<FormGroup> {
    return new Promise((resolve) => {
      this.conocimientosProgramacionComponent.sendFormularioLenguageProgramacion.subscribe(
        (formGroup: FormGroup) => {
          resolve(formGroup);
        },
        (error) => {
          console.error('Error al enviar formulario:', error);
        }
      );
    });
  }
}
