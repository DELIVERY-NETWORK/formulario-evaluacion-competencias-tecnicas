
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { AppserviceService } from '../service/appservice.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ReactiveFormsModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export default class InicioComponent {
  miFormulario!: FormGroup;
  captchaResponse: string | null = null;
  name: string = '';

  private appserviceService = inject(AppserviceService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      recaptcha: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  resolved(captchaResponse: any) {
    this.captchaResponse = captchaResponse;
    //this.miFormulario.get('recaptcha')?.setValue(captchaResponse);
    console.log('Captcha resuelto:', captchaResponse);
    this.miFormulario.get('recaptcha')?.setValue(captchaResponse);
  }

  nextPage(): void {
    this.appserviceService.flagPage = true;
    this.appserviceService.setFormDatos(this.miFormulario);
    this.router.navigate(['/test-form']);
  }
}
