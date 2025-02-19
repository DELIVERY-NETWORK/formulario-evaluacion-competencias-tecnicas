import { Routes } from '@angular/router';
import InicioComponent from './pages/inicio/inicio.component';
import TestFormComponent from './pages/test-form/test-form.component';
import { AuthGuard } from './pages/service/auth-guard.service';


export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'test-form',
    component: TestFormComponent,
    canActivate: [AuthGuard],
  },
];
