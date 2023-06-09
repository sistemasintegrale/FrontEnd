import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/main/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ReporteHistorialComponent } from './dashboard/reports/reporte-autos/reporte-historial.component';
import { ReporteMotosComponent } from './dashboard/reports/reporte-motos/reporte-motos.component';
 

const routes : Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate : [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data : {titulo : 'Main', subTitulo : 'Dashboard'} },
          { path: 'account-settings', component: AccountSettingsComponent, data : {titulo : 'Ajustes', subTitulo : 'Usuario'}  },
          { path: 'reporte-historial-autos', component: ReporteHistorialComponent, data : {titulo : 'Reporte historial autos', subTitulo : 'Dashboard'}  },
          { path: 'reporte-historial-motos', component: ReporteMotosComponent, data : {titulo : 'Reporte historial motos', subTitulo : 'Dashboard'}  },
          //matenimientos
          { path: 'usuarios', component: UsuariosComponent, data : {titulo : 'Usuarios de aplicación', subTitulo : 'Mantenimientos'}  },




        ]
      },
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class PagesRountingModule{

}
