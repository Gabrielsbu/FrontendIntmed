import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
//components
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { ConsultsComponent } from './modules/consults/consults.component';

//utils
import { CadastrarConsultaMobileComponent } from './modules/cadastrar-consulta-mobile/cadastrar-consulta-mobile.component';
import { ConsultaDetalhadaComponent } from './modules/consulta-detalhada/consulta-detalhada.component';
import { ModalConsultsComponent } from './modules/consults/modal-consults/modal-consults.component';

//interceptors
import { JwtInterceptor } from './cors/helpers/jwt.interceptor';

//angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConsultsComponent,
    ModalConsultsComponent,
    CadastrarConsultaMobileComponent,
    ConsultaDetalhadaComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
