import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-respuesta-envio',
  standalone: true,
  imports: [],
  templateUrl: './respuesta-envio.component.html',
  styleUrl: './respuesta-envio.component.css'
})
export default class RespuestaEnvioComponent {


  constructor(private router:Router) {

        setTimeout(() => {
          window.location.href = 'https://www.indracompany.com';
        }, 3000);

  }



}
