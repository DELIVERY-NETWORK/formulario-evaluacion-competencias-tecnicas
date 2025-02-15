import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-conocimientos-framework-entornos-desarrollo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './conocimientos-framework-entornos-desarrollo.component.html',
  styleUrl: './conocimientos-framework-entornos-desarrollo.component.css',
})
export class ConocimientosFrameworkEntornosDesarrolloComponent {
  miFormulario!: FormGroup;

  @Input()
  flagEnvioFormulario: boolean = false;

  @Output() sendFormularioLenguageProgramacion: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['flagEnvioFormulario'].firstChange) {
      setTimeout(() => {
        this.sendFormularioLenguageProgramacion.emit(this.miFormulario);
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      pythonNivel: [''],
      pythonAnios: [''],
      javaNivel: [''],
      javaAnios: [''],
      javascriptNivel: [''],
      javascriptAnios: [''],
      netNivel: [''],
      netAnios: [''],
    });
  }

  onRadioChange(lenguaje: string, nivel: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.sendFormularioLenguageProgramacion.emit(this.miFormulario);
  }

  onCheckboxChange(lenguaje: string, nivel: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const formGroup = (event.target as HTMLInputElement).closest('.form-group');

    if (isChecked) {
      this.miFormulario.get(`${lenguaje}Nivel`)?.setValue(nivel);
      this.uncheckOtherCheckboxes(formGroup, nivel);
      this.focusExperienceInput(lenguaje);
      let nom = `${lenguaje}Anios`;
      this.miFormulario
        .get(nom)
        ?.setValidators([Validators.required, Validators.min(0)]);
      this.miFormulario.get(`${lenguaje}Anios`)?.updateValueAndValidity();
    } else {
      this.miFormulario.get(`${lenguaje}Nivel`)?.setValue('');
      this.miFormulario.get(`${lenguaje}Anios`)?.setValue('');
      this.miFormulario.get(`${lenguaje}Anios`)?.clearValidators();
      this.miFormulario.get(`${lenguaje}Anios`)?.updateValueAndValidity();
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

  focusExperienceInput(lenguaje: string): void {
    const experienceInput = document.querySelector(
      `input[formControlName="${lenguaje}Anios"]`
    ) as HTMLInputElement;
    if (experienceInput) {
      experienceInput.focus();
    }
  }
}
