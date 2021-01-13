import {Injectable} from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {exhaustMap, take} from 'rxjs/operators';
import {BackendService} from './backend.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private backend: BackendService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const user = this.backend.curUser;
    if (!this.backend.curUser) { return next.handle(req); }
    const modifiedReq = req.clone({
      headers: new HttpHeaders({
        authorization: 'Bearer ' + user.token
      })
    });
    return next.handle(modifiedReq);
  }
}
