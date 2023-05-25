import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioData } from 'src/app/models/usuarios/usuarioData';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css'],
})
export class DialogClienteComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogClienteComponent>,
    public usuarioService: UsuarioService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public usuario: UsuarioData
  ) {
    if (this.usuario !== null) {
      this.titulo = 'Modificar usuario ' + this.usuario.nombre;
    }else{
      this.titulo = 'Nuevo usuario';

    }
  }
  ngOnInit(): void {
    if (this.usuario) {
      this.registerForm.patchValue({
        nombre : this.usuario.nombre,
        apellidos : this.usuario.apellidos,
        email : this.usuario.email,
        password : this.usuario.password,
        estado : this.usuario.estado
      })
    }

  }
  public estados = [
    {value : true, descripcion : 'Activo'},{value : false, descripcion : 'Inactivo'}
  ]

  public titulo = '';

  public formSubmitted = false;

  public registerForm: any = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    estado: [true, [Validators.required]],
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
          Swal.fire(
            'Usuario Creado',
            `Usuario ${data.data.nombre} fué creado correctamente`,
            'success'
            );
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
            Swal.fire(
              'Usuario modificado',
              `Usuario ${data.data.nombre} fué modificado correctamente`,
              'success'
              );
          }
        })
      }
      );
  }

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }

  public verPassword : boolean = false;

  cambiarTipo(valor : boolean){
    let elemento :any = document.getElementById('contraseña');
    this.verPassword = valor;
    if (valor) {
      elemento.type = "text";
    }else{
      elemento.type = "password";
    }

  }

}
