import { Component,  inject,  ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConocimientosProgramacionComponent } from "./components/conocimientos-programacion/conocimientos-programacion.component";
import { ConocimientosFrameworkEntornosDesarrolloComponent } from "./components/conocimientos-framework-entornos-desarrollo/conocimientos-framework-entornos-desarrollo.component";
import { IntegracionPlataformasApisComponent } from "./components/integracion-plataformas-apis/integracion-plataformas-apis.component";
import { ConocimientoInfraestructuraNubeDevopsComponent } from './components/conocimiento-infraestructura-nube-devops/conocimiento-infraestructura-nube-devops.component';
import { BaseDatosComponent } from "./components/base-datos/base-datos.component";
import { DesarrolloInterfacesFrontComponent } from './components/desarrollo-interfaces-front/desarrollo-interfaces-front.component';
import { ExperienciaMetodologiasAgilesComponent } from './components/experiencia-metodologias-agiles/experiencia-metodologias-agiles.component';
import { AppserviceService } from '../service/appservice.service';
import { SendService } from '../service/send.service';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    ConocimientosProgramacionComponent,
    ConocimientosFrameworkEntornosDesarrolloComponent,
    IntegracionPlataformasApisComponent,
    ConocimientoInfraestructuraNubeDevopsComponent,
    BaseDatosComponent,
    DesarrolloInterfacesFrontComponent,
    ExperienciaMetodologiasAgilesComponent,
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export default class TestFormComponent {

  private sendService = inject(SendService);

  flagFormularioInformacion : boolean = false;
  flagFormularioValido : boolean = true;

  title = 'Formulario de Evaluación de Competencias Técnicas';

  flagFormulario: boolean = false;

  miFormularioDatos!: FormGroup;
  miFormularioLenguageProgramacion!: FormGroup;
  miFormularioFrameworkEntornosDesarrollo!: FormGroup;
  miFormularioIntegracionPlataformasApis!: FormGroup;
  miFormularioInfraestructuraEnLaNube!: FormGroup;
  miFormularioBaseDatos!: FormGroup;
  miFormularioDesarrolloInterfacesFrontComponent!: FormGroup;
  miFormularioMetodologiaAgiles!: FormGroup;

  isProcessing: boolean = false;

  @ViewChild(ConocimientosProgramacionComponent)
  conocimientosProgramacionComponent!: ConocimientosProgramacionComponent;

  @ViewChild(ConocimientosFrameworkEntornosDesarrolloComponent)
  conocimientosFrameworkEntornosDesarrolloComponent!: ConocimientosFrameworkEntornosDesarrolloComponent;

  @ViewChild(IntegracionPlataformasApisComponent)
  integracionPlataformasApisComponent!: IntegracionPlataformasApisComponent;

  @ViewChild(ConocimientoInfraestructuraNubeDevopsComponent)
  conocimientoInfraestructuraNubeDevopsComponent!: ConocimientoInfraestructuraNubeDevopsComponent;

  @ViewChild(BaseDatosComponent)
  baseDatosComponent!: BaseDatosComponent;

  @ViewChild(DesarrolloInterfacesFrontComponent)
  desarrolloInterfacesFrontComponent!: DesarrolloInterfacesFrontComponent;

  @ViewChild(ExperienciaMetodologiasAgilesComponent)
  experienciaMetodologiasAgilesComponent!: ExperienciaMetodologiasAgilesComponent;

  private appserviceService = inject(AppserviceService);

  constructor(private router:Router) {
    this.miFormularioDatos = this.appserviceService.getFormDatos();
  }

  updateFormulario(form: FormGroup): void {}

  async enviarForm() {

    this.flagFormularioInformacion = false;
    this.flagFormularioValido = true;

    this.isProcessing = true;

    this.flagFormulario = !this.flagFormulario;

    //Esperar respuesta de los formularios
    this.miFormularioLenguageProgramacion = await this.esperarRespuesta(
      this.conocimientosProgramacionComponent,
      'sendFormulario'
    );

    this.miFormularioFrameworkEntornosDesarrollo = await this.esperarRespuesta(
      this.conocimientosFrameworkEntornosDesarrolloComponent,
      'sendFormularioFrameworkEntornosDesarrollo'
    );

    this.miFormularioIntegracionPlataformasApis = await this.esperarRespuesta(
      this.integracionPlataformasApisComponent,
      'sendIntegracionPlataformasApis'
    );

    this.miFormularioInfraestructuraEnLaNube = await this.esperarRespuesta(
      this.conocimientoInfraestructuraNubeDevopsComponent,
      'sendFormulario'
    );

    this.miFormularioBaseDatos = await this.esperarRespuesta(
      this.baseDatosComponent,
      'sendFormulario'
    );

    this.miFormularioDesarrolloInterfacesFrontComponent =
      await this.esperarRespuesta(
        this.desarrolloInterfacesFrontComponent,
        'sendFormulario'
      );

    this.miFormularioMetodologiaAgiles = await this.esperarRespuesta(
      this.experienciaMetodologiasAgilesComponent,
      'sendFormulario'
    );
    //Validacion de formularios

    this.validarFormulario(
      this.miFormularioLenguageProgramacion,
      'Lenguajes de Programación'
    );
    this.validarFormulario(
      this.miFormularioFrameworkEntornosDesarrollo,
      'Frameworks y Entornos de Desarrollo'
    );
    this.validarFormulario(
      this.miFormularioIntegracionPlataformasApis,
      'Integración de Plataformas y APIs'
    );

    this.validarFormulario(
      this.miFormularioInfraestructuraEnLaNube,
      'Integración de Infraestructura en la Nube y DevOps'
    );

    this.validarFormulario(this.miFormularioBaseDatos, 'Base de Datos');

    this.validarFormulario(
      this.miFormularioDesarrolloInterfacesFrontComponent,
      'Desarrollo de Interfaces Frontend'
    );

    this.validarFormulario(
      this.miFormularioMetodologiaAgiles,
      'Experiencia en Metodologías Ágiles'
    );

    let data = this.miFormularioDatos.value;
    //console.log('data:', datos);

    let data1 = this.miFormularioLenguageProgramacion.value;
    //console.log('data1:', data1);

    let data2 = this.miFormularioFrameworkEntornosDesarrollo.value;
    //console.log('data2:', data2);

    let data3 = this.miFormularioIntegracionPlataformasApis.value;
    //console.log('data3:', data3);

    let data4 = this.miFormularioInfraestructuraEnLaNube.value;
    //console.log('data4:', data4);

    let data5 = this.miFormularioBaseDatos.value;
    //console.log('data5:', data5);

    let data6 = this.miFormularioDesarrolloInterfacesFrontComponent.value;
    //console.log('data6:', data6);

    let data7 = this.miFormularioMetodologiaAgiles.value;
    //console.log('data7:', data7);

    const dataAll = {
      data,
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
    };

    console.log('data:', data);

    if(this.flagFormularioValido){
      console.log('Formulario válido:', this.flagFormularioValido);
      if(!this.flagFormularioInformacion){
        Swal.fire({
          title: 'Atencion',
          text: 'No selecciono ninguna opcion en el formulacio',
          icon: 'warning',
        });
        this.isProcessing = false;
        return;
      }
    }else{
      Swal.fire({
        title: 'Validacoin',
        text: 'Existe informacion incompleta en el formulario',
        icon: 'error',
      });
      this.isProcessing = false;
      return;
    }

    this.sendService.sendForm(dataAll).subscribe(
      (response: any) => {
        console.log('Respuesta:', response);



          this.router.navigate(['/envio-exito']);



      }
    );

    this.isProcessing = false;
  }

  validarFormulario(formGroup: FormGroup, seccion: string): void {
    console.log('Validando formulario:', seccion);
    if (formGroup.valid) {
      if (this.formularioTieneInformacion(formGroup)) {
        console.log('Formulario tiene información');
        this.flagFormularioInformacion = true;
      } else {
        console.log('Formulario no tiene información');
      }
      console.log('Formulario válido:', formGroup);
    } else {
      console.log('Formulario inválido:', formGroup);
      this.flagFormularioValido = false;
    }
  }

  formularioTieneInformacion(formGroup: FormGroup): boolean {
    for (const controlName in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(controlName)) {
        const control = formGroup.get(controlName);
        if (control && control.value) {
          return true;
        }
      }
    }
    return false;
  }

  esperarRespuesta(
    component: any,
    eventEmitterName: string
  ): Promise<FormGroup> {
    return new Promise((resolve) => {
      component[eventEmitterName].subscribe(
        (formGroup: FormGroup) => {
          resolve(formGroup);
        },
        (error: any) => {
          console.error('Error al enviar formulario:', error);
        }
      );
    });
  }
}
