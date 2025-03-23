import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-desarrollo-interfaces-front',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './desarrollo-interfaces-front.component.html',
  styleUrl: './desarrollo-interfaces-front.component.css',
})
export class DesarrolloInterfacesFrontComponent {
  miFormulario!: FormGroup;

  @Input()
  flagEnvioFormulario: boolean = false;

  @Output() sendFormulario: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['flagEnvioFormulario'].firstChange) {
      setTimeout(() => {
        this.sendFormulario.emit(this.miFormulario);
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      frontendNivel: [''],
      frontendAnios: [null],
    });

    this.disableAllAniosInputs();
  }

  onCheckboxChange(lenguaje: string, nivel: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const formGroup = (event.target as HTMLInputElement).closest('.form-group');

    if (isChecked) {
      this.miFormulario.get(`${lenguaje}Nivel`)?.setValue(nivel);
      this.uncheckOtherCheckboxes(formGroup, nivel);
      if (nivel === 'Basico') {
        this.miFormulario.get(`${lenguaje}Anios`)?.setValue(null);
        this.focusExperienceInput(lenguaje, true);
        this.miFormulario.get(`${lenguaje}Anios`)?.clearValidators();
        this.miFormulario.get(`${lenguaje}Anios`)?.updateValueAndValidity();
      } else {
        this.focusExperienceInput(lenguaje, false);
        let nom = `${lenguaje}Anios`;
        this.miFormulario
          .get(nom)
          ?.setValidators([
            Validators.required,
            Validators.min(1),
            Validators.max(30),
            Validators.pattern('^[0-9]*$'),
          ]);
        this.miFormulario.get(`${lenguaje}Anios`)?.updateValueAndValidity();
      }
    } else {
      this.miFormulario.get(`${lenguaje}Nivel`)?.setValue('');
      this.miFormulario.get(`${lenguaje}Anios`)?.setValue(null);
      this.miFormulario.get(`${lenguaje}Anios`)?.clearValidators();
      this.miFormulario.get(`${lenguaje}Anios`)?.updateValueAndValidity();
      this.focusExperienceInput(lenguaje, true);
    }
  }

  uncheckOtherCheckboxes(formGroup: Element | null, nivel: string): void {
    if (formGroup) {
      const checkboxes = formGroup.querySelectorAll(`input[type="checkbox"]`);
      checkboxes.forEach((checkbox: any) => {
        if (checkbox.value !== nivel) {
          checkbox.checked = false;
        }
      });
    }
  }

  focusExperienceInput(lenguaje: string, habiliado: boolean): void {
    const experienceInput = document.querySelector(
      `input[formControlName="${lenguaje}Anios"]`
    ) as HTMLInputElement;
    if (experienceInput) {
      experienceInput.readOnly = habiliado;
      experienceInput.focus();
    }
  }

  disableAllAniosInputs(): void {
    Object.keys(this.miFormulario.controls).forEach((controlName) => {
      if (controlName.endsWith('Anios')) {
        const control = this.miFormulario.get(controlName);
        if (control) {
          //control.disable();
          const inputElement = document.querySelector(
            `input[formControlName="${controlName}"]`
          ) as HTMLInputElement;
          if (inputElement) {
            inputElement.readOnly = true;
          }
        }
      }
    });
  }

  onInputChange(controlName: string, event: any): void {
    const value = event.target.value;
    const integerValue = value.replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    this.miFormulario.get(controlName)?.setValue(integerValue);
  }
}
