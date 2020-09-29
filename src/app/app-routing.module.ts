import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { ConsultsComponent } from './modules/consults/consults.component';
import { CadastrarConsultaMobileComponent } from './modules/cadastrar-consulta-mobile/cadastrar-consulta-mobile.component';
import { ConsultaDetalhadaComponent } from './modules/consulta-detalhada/consulta-detalhada.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'consults',
    component: ConsultsComponent,
  },

  {
    path: 'register-consult',
    component: CadastrarConsultaMobileComponent,
  },

  {
    path: 'detail-consult',
    component: ConsultaDetalhadaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
