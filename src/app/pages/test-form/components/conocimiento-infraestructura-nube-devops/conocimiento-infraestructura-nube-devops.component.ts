import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-conocimiento-infraestructura-nube-devops',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './conocimiento-infraestructura-nube-devops.component.html',
  styleUrl: './conocimiento-infraestructura-nube-devops.component.css',
})
export class ConocimientoInfraestructuraNubeDevopsComponent {
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
      azureNivel: [''],
      azureAnios: [''],
      awsNivel: [''],
      awsAnios: [''],
      gcpNivel: [''],
      gcpAnios: [''],
      dockerNivel: [''],
      dockerAnios: [''],
      terraformNivel: [''],
      terraformAnios: [''],
      airflowNivel: [''],
      airflowAnios: [''],
      cicdNivel: [''],
      cicdAnios: [''],
      monitoreoNivel: [''],
      monitoreoAnios: [''],
    });
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
