
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { AppserviceService } from '../service/appservice.service';
import { SendService } from '../service/send.service';
import { ToastService } from '../service/toast.service';

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
  messageVisible = false;
  isProcessing:boolean = false;

  private appserviceService = inject(AppserviceService);
  private sendService = inject(SendService);
  toastService = inject(ToastService);

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      recaptcha: [''],
    });
  }

  siguiente(): void {
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

  nextPage() {
    if (this.miFormulario.invalid) {
      console.log('Formulario no válido');
      this.showMessage();
      return;
    }
    const data = this.miFormulario.value;
    this.isProcessing = true;

    this.sendService.validarEmail(data).subscribe({
      next: (flaExisteEmail) => {
        this.isProcessing = false;
        if (!flaExisteEmail) {
          this.appserviceService.flagPage = true;
          this.appserviceService.flagPageInicio = true;
          this.appserviceService.setFormDatos(this.miFormulario);
          this.router.navigate(['/test-form']);
        } else {
          console.log('El email ya existe:', data);
          this.mostrarToast();
        }

      },
      error: (error) => {
        this.isProcessing = false;
        console.error('Error en el servidor:', error);
        this.showMessage();
        return;
      },
    });
  }

  showMessage() {
    console.log('Mostrando mensaje');
    this.messageVisible = true;
    setTimeout(() => {
      this.messageVisible = false;
    }, 3000); // Ocultar el mensaje después de 3 segundos
  }

  mostrarToast() {

    // this.toastService.show('¡Atencion : El email ya esta registrado!', {
    //   classname: 'bg-success text-white',
    // });
    this.toastService.show(
      'El e-mail, ya esta registrado!!!',
      'bg-success text-white',
      3000
    );
  }
}
