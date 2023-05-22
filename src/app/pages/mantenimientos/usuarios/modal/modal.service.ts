import { EventEmitter, Injectable } from '@angular/core';
import { UsuarioData } from 'src/app/models/usuarios/usuarioData';

@Injectable({
  providedIn: 'root'
})
export class ModalUsuarioService {

  private _ocultarModal : boolean = true;
  public usuario! : UsuarioData;
  public nuevosDatos :EventEmitter<string> = new EventEmitter<string>();

  getOcultarModal(){
    return this._ocultarModal;
  }

  abrirModal(data? : UsuarioData){
    this.usuario = data!;
    this._ocultarModal = false;
  }

  cerrarModal(){
    this._ocultarModal = true;
  }

  

  constructor() { }
}
