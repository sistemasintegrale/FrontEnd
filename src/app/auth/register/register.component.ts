import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,
    private usuarioService : UsuarioService) {}

  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Rafhael', [Validators.required]],
      apellidos: ['Pillaca Pariona', [Validators.required]],
      email: [
        'rafhaelpillaca@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123321', [Validators.required]],
      password2: ['123321', [Validators.required]],
      terminos: [true, [Validators.required]],
    },
    {
      validators : this.passwordsIguales('password','password2')
    }
  );



  crearUsuario() {
    this.formSubmitted = true;
    if(this.registerForm.invalid)
    return;
    this.usuarioService.crearUsuario(this.registerForm.value)
    .subscribe(res =>{
      console.log(res),
      console.log('Usuario Creado')
      Swal.fire('Buen trabajo',`Usuario ${this.registerForm.get('nombre')?.value} creado`,'success')
  },(err) => console.warn);
  }

  campoNoValido(campo: string): boolean {
    return this.registerForm.get(campo)?.invalid! && this.formSubmitted;
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contraseniasoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    return pass1 !== pass2 && this.formSubmitted;
  }

  passwordsIguales(passName1 : string, passName2 :string){
    return (formGroup : FormGroup)=>{
      const pass1Control = formGroup.get('passName1');
      const pass2Control = formGroup.get('passName2');
      if (pass1Control === pass2Control) {
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual : true});
      }
    }
  }
}
