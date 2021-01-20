import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {BackendService} from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AppAdminGuard implements CanActivate {
  constructor(private backend: BackendService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.backend.curUser.admin) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }

}
