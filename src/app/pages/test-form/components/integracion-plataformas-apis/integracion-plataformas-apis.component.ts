import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-integracion-plataformas-apis',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './integracion-plataformas-apis.component.html',
  styleUrl: './integracion-plataformas-apis.component.css',
})
export class IntegracionPlataformasApisComponent {
  miFormulario!: FormGroup;

  @Input()
  flagEnvioFormulario: boolean = false;

  @Output() sendIntegracionPlataformasApis: EventEmitter<FormGroup> =
    new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['flagEnvioFormulario'].firstChange) {
      setTimeout(() => {
        this.sendIntegracionPlataformasApis.emit(this.miFormulario);
      }, 2000);
    }
  }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      openaiNivel: [''],
      openaiAnios: [''],
      azureaiserviceNivel: [''],
      azureaiserviceAnios: [''],
      awsbedrockNivel: [''],
      awsbedrockAnios: [''],
      googlevertexaiNivel: [''],
      googlevertexaiAnios: [''],
      huggingfaceNivel: [''],
      huggingfaceAnios: [''],
      ibmWatsonAINivel: [''],
      ibmWatsonAIAnios: [''],
      databricksMlflowNivel: [''],
      databricksMlflowAnios: [''],
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
