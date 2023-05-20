import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private usuarioService : UsuarioService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.usuarioService.getToken()
    if(userToken){
      req = req.clone({
        setHeaders :{
          Authorization : `Bearer ${userToken}`
        }
      });
    }
    return next.handle(req)
  }


}
