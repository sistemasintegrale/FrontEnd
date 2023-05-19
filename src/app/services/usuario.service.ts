import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { environment } from 'src/environments/environments';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuario`, formData);
  }

  login(formData: LoginForm) {
    console.log(formData);
    return this.http.post(`${base_url}/usuario/generate/token`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.data)
        }));
  }
}
