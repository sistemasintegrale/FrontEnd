import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioData } from 'src/app/models/usuarios/usuarioData';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public usuario! : UsuarioData;
  public menuItems !: any[];
  constructor(private sideBarService : SidebarService,
    private usuarioService : UsuarioService,
    private router : Router){
    this.menuItems = sideBarService.menu;
      this.usuario = usuarioService.usuario;
  }
  ngOnInit(): void {

  }



logout(){
this.usuarioService.logOut();
this.router.navigateByUrl('/login')
}
}
