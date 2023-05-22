import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dasboard/main/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ModalMantenimientoComponent } from './mantenimientos/usuarios/modal/modal-mantenimiento/modal-mantenimiento.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    UsuariosComponent,
    ModalMantenimientoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports : [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
  ]
})
export class PagesModule { }
