import { publishFacade } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterForm } from 'src/app/interfaces/usuario/register-form.interface';
import { UsuarioCreate } from 'src/app/models/usuarios/usuarioCreate';
import { UsuarioData } from 'src/app/models/usuarios/usuarioData';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css'],
})
export class DialogClienteComponent {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogClienteComponent>,
    public usuarioService: UsuarioService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public usuario: UsuarioData
  ) {
    if (this.usuario !== null) {
    }
  }

  public formSubmitted = false;

  public registerForm: any = this.fb.group({
    nombre: [this.usuario !==null ?this.usuario.nombre : '', [Validators.required]],
    apellidos: [this.usuario !==null ?this.usuario.apellidos : '', [Validators.required]],
    email: [
      this.usuario !==null ?this.usuario.email : '',
      [Validators.required, Validators.email],
    ],
    password: [this.usuario !==null ?this.usuario.password : '', [Validators.required]],
    terminos: [this.usuario !==null ?this.usuario.estado : true, [Validators.required]],
  });

  close() {
    this.dialogRef.close();
  }

  addUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe({
      next:((data) =>{
        if (data.isSucces) {
          this.dialogRef.close(true);
          this.snackBar.open('Usuario Creado con exito', '', {
            duration: 2000,
          });
        }
      })
    }
    );
  }

  editUsuario() {
    this.formSubmitted = true;
    if (this.registerForm.invalid)
      return;
    this.usuarioService
      .modificarUsuario(this.registerForm.value, this.usuario.id)
      .subscribe({
        next:((data) =>{
          if (data.isSucces) {
            this.dialogRef.close(true);
            this.snackBar.open('Usuario Modificardo con exito', '', {
              duration: 2000,
            });
          }
        })
      }
      );
  }

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }
}
