import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { authGuard } from '../guards/auth.guard';

const routes : Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate : [authGuard],
        children: [
          { path: '', component: DashboardComponent, data : {titulo : 'Dashboard'} },
          { path: 'account-settings', component: AccountSettingsComponent, data : {titulo : 'Ajustes'}  },
        ]
      },
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class PagesRountingModule{

}
