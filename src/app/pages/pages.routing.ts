import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/main/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes : Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate : [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data : {titulo : 'Dashboard'} },
          { path: 'account-settings', component: AccountSettingsComponent, data : {titulo : 'Ajustes'}  },

          //matenimientos
          { path: 'usuarios', component: UsuariosComponent, data : {titulo : 'Usuarios de aplicación'}  },

        ]
      },
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class PagesRountingModule{

}
