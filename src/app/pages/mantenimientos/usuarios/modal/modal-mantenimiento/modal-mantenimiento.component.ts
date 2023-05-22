import { UsuarioData } from 'src/app/models/usuarios/usuarioData';
import { ModalUsuarioService } from './../modal.service';
import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-mantenimiento',
  templateUrl: './modal-mantenimiento.component.html',
  styleUrls: ['./modal-mantenimiento.component.css']
})
export class ModalMantenimientoComponent {

  constructor(private fb: FormBuilder,
    public modalUsuarioService: ModalUsuarioService,
    public usuarioService: UsuarioService) { }  
    nombre : string  ='';  

  public formSubmitted = false;

  public registerForm: any = this.fb.group(
    {
      nombre: [this.nombre, [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required]],
    }
  );

  cerrarModal() {
    this.modalUsuarioService.cerrarModal();
  }

  SetSave() {    
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;
      this.GuardarUsuario();
  }

  GuardarUsuario(){
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(res => {
      console.log(res),
        console.log('Usuario Creado')
      Swal.fire('Buen trabajo', `Usuario ${this.registerForm.get('nombre')?.value} creado`, 'success');
      this.cerrarModal();
      this.modalUsuarioService.nuevosDatos.emit('nuevo')
    }, (err) => console.warn);
  }

  ModificarUsuario(){
    this.usuarioService.modificarUsuario(this.registerForm.value, this.modalUsuarioService.usuario!.id)
    .subscribe(res => {
      console.log(res),
        console.log('Usuario Creado')
      Swal.fire('Buen trabajo', `Usuario ${this.registerForm.get('nombre')?.value} creado`, 'success');
      this.cerrarModal();
      this.modalUsuarioService.nuevosDatos.emit('nuevo')
    }, (err) => console.warn);
  }

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }
}
