import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu : any[] = [
    {
      titulo : 'Dashboard',
      icono : 'mdi mdi-gauge',
      submenu:[
        {
          titulo : 'Main', url : '/dashboard'
        },
        {
          titulo : 'Reporte Historial Autos', url : 'reporte-historial-autos'
        },
        {
          titulo : 'Reporte Historial Motos', url : 'reporte-historial-motos'
        }
      ]
    },
    {
      titulo : 'Mantenimientos',
      icono : 'mdi mdi-folder-lock-open',
      submenu:[
        {
          titulo : 'Usuarios', url : 'usuarios'
        }
      ]
    }
  ]
  constructor() { }
}
