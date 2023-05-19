import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  public loginForm : any = this.fb.group({
    email: [
      'rafhaelpillaca@gmail.com',
      [Validators.required, Validators.email],
    ],
    password: ['123321', [Validators.required]],
    remember : [false]
  });

  login() {
    this.usuarioService.login(this.loginForm.value);
    this.router.navigateByUrl('/');
    console.log(this.loginForm.value);
  }

}
