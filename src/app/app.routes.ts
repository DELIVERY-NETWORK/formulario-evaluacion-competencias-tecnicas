import { Routes } from '@angular/router';
import InicioComponent from './pages/inicio/inicio.component';
import TestFormComponent from './pages/test-form/test-form.component';
import { AuthGuard } from './pages/service/auth-guard.service';
import GoComponent from './pages/go/go.component';
import { AuthGuard2 } from './pages/service/auth-guard2.service';
import RespuestaEnvioComponent from './pages/respuesta-envio/respuesta-envio.component';


export const routes: Routes = [
  {
    path: '',
    component: GoComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test-form',
    component: TestFormComponent,
    canActivate: [AuthGuard2],
  },
  {
    path: 'envio-exito',
    component: RespuestaEnvioComponent,
    canActivate: [AuthGuard2],
  },
];
