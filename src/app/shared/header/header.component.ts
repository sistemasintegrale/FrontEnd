import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioData } from 'src/app/models/usuarios/usuarioData';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public usuario! : UsuarioData;
  constructor(private usuarioService : UsuarioService,
              private router : Router){
                this.usuario = usuarioService.usuario;
              }

  logout(){
    this.usuarioService.logOut();
    this.router.navigateByUrl('/login')
  }
}
