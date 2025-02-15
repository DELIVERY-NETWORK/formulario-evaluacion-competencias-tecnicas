import { Component, EventEmitter, OnChanges, Output, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-conocimientos-programacion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './conocimientos-programacion.component.html',
  styleUrl: './conocimientos-programacion.component.css',
})
export class ConocimientosProgramacionComponent implements OnChanges {
  miFormulario!: FormGroup;

  @Output()
  sendFormularioLenguageProgramacion:EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
  }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      pythonNivel: ['', Validators.required],
      pythonAnios: ['', [Validators.required, Validators.min(0)]],
      javaNivel: ['', Validators.required],
      javaAnios: ['', [Validators.required, Validators.min(0)]],
      javascriptNivel: ['', Validators.required],
      javascriptAnios: ['', [Validators.required, Validators.min(0)]],
      netNivel: ['', Validators.required],
      netAnios: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onRadioChange(lenguaje: string, nivel: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(
      `Lenguaje: ${lenguaje}, Nivel: ${nivel}, Checked: ${isChecked}`
    );

    this.sendFormularioLenguageProgramacion.emit(this.miFormulario);
    // Aquí puedes manejar el estado del objeto según sea necesario
  }

  onSubmit(): void {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
