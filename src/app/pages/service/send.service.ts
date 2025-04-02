import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment  } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { MessagesService } from '../shared/messages/messages.service';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SendService {
  private messagesService = inject(MessagesService);

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) {}

  sendForm(data: any, captcha: string) {
    const controller = 'test';
    const evento = 'send';

    let url =
      environment.protocol +
      environment.host +
      environment.port +
      '/' +
      //environment.context +
      controller +
      '/';

    //const miurl = 'https://api.cloud2recruiting.com:8080/test/create';
    const miurl = environment.dominio + '/test/create'; // 'https://api.cloud2recruiting.com/test/create';
    const headersWithCaptcha = this.httpHeaders.set('Captcha', captcha);

    return this.http.post(miurl, data, { headers: headersWithCaptcha }).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        this.messagesService.message_error('Atencion', e.error.mensaje);
        return throwError(() => e.error);
      })
    );
  }

  validarEmail(data: any) {
    const miurl = environment.dominio + '/test/validar'; //
    return this.http.post(miurl, data, { headers: this.httpHeaders }).pipe(
      catchError((e) => {

        console.error(e.error.mensaje);
        if(e.status == 404){
          this.messagesService.message_warning('Atencion', e.error.mensaje);
        }else{
          this.messagesService.message_error('Atencion', e.error.mensaje);
        }
        return throwError(() => e.error);
      })
    );
  }
}
