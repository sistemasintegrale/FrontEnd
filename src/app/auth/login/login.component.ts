import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

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
  ) { }

  public loginForm: any = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required]],
    remember: [JSON.parse(localStorage.getItem('remember')!) || false]
  });

  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(
        resp => {
          if (this.loginForm.get('remember').value) {
            localStorage.setItem('email', this.loginForm.get('email').value)
            localStorage.setItem('remember', this.loginForm.get('remember').value)
          } else {
            if (localStorage.getItem('email')) {
              localStorage.removeItem('email');
              localStorage.removeItem('remember');
            }
          }
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
    this.router.navigateByUrl('/');

  }

}
