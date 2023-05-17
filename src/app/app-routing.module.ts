import { NgModule } from '@angular/core';
import { PagesRountingModule } from './pages/pages.routing';

import { RouterModule, Routes } from '@angular/router'
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthRountingModule } from './auth/aurth.routing';


const routes: Routes = [
  
  { path: '', redirectTo : '/dashboard', pathMatch : 'full' },
  { path: '**', component: NopageFoundComponent }

]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRountingModule,
    AuthRountingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
