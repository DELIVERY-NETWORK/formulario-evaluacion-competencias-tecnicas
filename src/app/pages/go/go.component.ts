import { Component, inject } from '@angular/core';
import { AppserviceService } from '../service/appservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go',
  standalone: true,
  imports: [],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css',
})
export default class GoComponent {
  messageVisible = false;

  private appserviceService = inject(AppserviceService)

  constructor(
    private router: Router
  ) {}

  showMessage() {
    console.log('Mostrando mensaje');
    this.messageVisible = true;
    setTimeout(() => {
      this.messageVisible = false;
    }, 3000); // Ocultar el mensaje después de 3 segundos
  }

  registrar() {
    console.log('Registrando');
    this.appserviceService.changeFlagPage();
    this.router.navigate(['/inicio']);
  }
}
