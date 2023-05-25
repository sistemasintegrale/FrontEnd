import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/main/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DialogClienteComponent } from './mantenimientos/usuarios/dialog/dialog-cliente/dialog-cliente.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ReporteHistorialComponent } from './dashboard/reports/reporte-historial.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    UsuariosComponent,
    DialogClienteComponent,
    ReporteHistorialComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule
  ],
  exports : [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
  ]
})
export class PagesModule { }
