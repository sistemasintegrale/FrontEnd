import { Component, OnInit } from '@angular/core';
import { UsuarioData } from 'src/app/models/usuarios/usuarioData';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios : number = 0 ;
  public usuarios : UsuarioData[] = [];
  public desde:number = 0;
  public cargando = true;

  constructor(private usuarioService: UsuarioService) { }
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios()
    .subscribe(resp =>{
      this.totalUsuarios = resp.data.length;
      this.usuarios = resp.data
      this.cargando = false;
    });
  }
}
