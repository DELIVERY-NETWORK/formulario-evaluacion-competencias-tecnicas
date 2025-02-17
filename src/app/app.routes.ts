import { Routes } from '@angular/router';
import InicioComponent from './pages/inicio/inicio.component';
import TestFormComponent from './pages/test-form/test-form.component';


export const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
  },
  {
    path: 'test-form',
    component: TestFormComponent,
  },
];
