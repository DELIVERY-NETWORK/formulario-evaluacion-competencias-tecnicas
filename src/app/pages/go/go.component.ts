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

  private appserviceService = inject(AppserviceService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.resizeDiv();
  }

  ngAfterViewInit() {

    setTimeout(() => {
      //this.resizeDiv();

    }, 50);
  }


  resizeDiv() {
      const imgElement = document.querySelector('.img-fluid') as HTMLElement;
      const divElement = document.querySelector('.div-fluid') as HTMLElement;

      if (imgElement && divElement) {
        const imgWidth = imgElement.offsetWidth + 30; // Obtiene el ancho de la imagen
        const imgMarginBottom = parseInt(getComputedStyle(imgElement).marginBottom); // Obtiene el margen inferior de la imagen
        // divElement.style.width = `${imgWidth}px`; // Aplica el ancho a .div-fluid
        // divElement.style.marginTop = `${imgMarginBottom - 60}px`; // Aplica la altura a .div-fluid

        if(window.innerWidth < 1046){
          divElement.style.width = `${imgWidth}px`; // Aplica el ancho a .div-fluid
          divElement.style.marginTop = `${imgMarginBottom - 60}px`; // Aplica la altura a .div-fluid
        }else{
          divElement.style.width = `${imgWidth}px`;
          divElement.style.marginTop = `${imgMarginBottom - 60}px`; // Aplica la altura a .div-fluid
        }
      }

      // Escucha cambios en el tamaño de la ventana para actualizar dinámicamente
      window.addEventListener('resize', () => {
        if (imgElement && divElement) {
          const imgWidth = imgElement.offsetWidth;
          const imgMarginBottom = parseInt(getComputedStyle(imgElement).marginBottom); // Obtiene el margen inferior de la imagen

          if(window.innerWidth < 1046){
            divElement.style.width = `${imgWidth}px`;
            divElement.style.marginTop = `${imgMarginBottom - 60}px`; // Aplica la altura a .div-fluid
          }else{
            divElement.style.width = `${imgWidth}px`;
            divElement.style.marginTop = `${imgMarginBottom - 60}px`; // Aplica la altura a .div-fluid
          }
          // divElement.style.width = `${imgWidth}px`;
          // divElement.style.marginTop = `${imgMarginBottom - 60}px`; // Aplica la altura a .div-fluid

          console.log('Ancho de la imagen:', window.innerWidth);
        }
      });
  }

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
