import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ConocimientosProgramacionComponent } from "./components/conocimientos-programacion/conocimientos-programacion.component";
import { FormGroup } from '@angular/forms';
import { ConocimientosFrameworkEntornosDesarrolloComponent } from "./components/conocimientos-framework-entornos-desarrollo/conocimientos-framework-entornos-desarrollo.component";

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    ConocimientosProgramacionComponent,
    ConocimientosFrameworkEntornosDesarrolloComponent,
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export default class TestFormComponent {
  title = 'Formulario de Evaluación de Competencias Técnicas';

  flagFormularioLenguageProgramacion: boolean = false;

  miFormularioLenguageProgramacion!: FormGroup;
  miFormularioFrameworkEntornosDesarrollo!: FormGroup;

  isProcessing: boolean = false;

  @ViewChild(ConocimientosProgramacionComponent)
  conocimientosProgramacionComponent!: ConocimientosProgramacionComponent;

  @ViewChild(ConocimientosFrameworkEntornosDesarrolloComponent)
  conocimientosFrameworkEntornosDesarrolloComponent!: ConocimientosFrameworkEntornosDesarrolloComponent;

  constructor() {}

  updateFormularioLenguageProgramacion(form: FormGroup): void {}

  async enviarForm() {
    this.isProcessing = true;

    this.flagFormularioLenguageProgramacion =
      !this.flagFormularioLenguageProgramacion;

    //this.miFormularioLenguageProgramacion = await this.esperarRespuesta1();

    this.miFormularioLenguageProgramacion = await this.esperarRespuesta(
      this.conocimientosProgramacionComponent,
      'sendFormularioLenguageProgramacion'
    );

    if (this.miFormularioLenguageProgramacion.valid) {
      console.log('Formulario válido:', this.miFormularioLenguageProgramacion);

      if (
        this.formularioTieneInformacion(this.miFormularioLenguageProgramacion)
      ) {
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


    this.miFormularioFrameworkEntornosDesarrollo = await this.esperarRespuesta(
      this.conocimientosFrameworkEntornosDesarrolloComponent,
      'sendFormularioFrameworkEntornosDesarrollo'
    );


    if (this.miFormularioFrameworkEntornosDesarrollo.valid) {
      console.log(
        'Formulario válido:',
        this.miFormularioFrameworkEntornosDesarrollo
      );

      if (
        this.formularioTieneInformacion(
          this.miFormularioFrameworkEntornosDesarrollo
        )
      ) {
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

  esperarRespuesta(
    component: any,
    eventEmitterName: string
  ): Promise<FormGroup> {
    return new Promise((resolve) => {
      component[eventEmitterName].subscribe(
        (formGroup: FormGroup) => {
          resolve(formGroup);
        },
        (error: any) => {
          console.error('Error al enviar formulario:', error);
        }
      );
    });
  }

  esperarRespuesta1(): Promise<FormGroup> {
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

  esperarRespuesta2(): Promise<FormGroup> {
    return new Promise((resolve) => {
      this.conocimientosFrameworkEntornosDesarrolloComponent.sendFormularioFrameworkEntornosDesarrollo.subscribe(
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
