import {Injectable} from '@angular/core';
import {LoggedInUser} from './shared/logged-in-user.model';
import {HttpClient} from '@angular/common/http';
import {Product} from './shared/product.model';
import {catchError, map, tap} from 'rxjs/operators';
import {ProductsService} from './shop/products.service';
import {Observable, throwError} from 'rxjs';
import {log} from 'util';
import {Router} from '@angular/router';
import {LoginFormService} from './login/login-form/login-form.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  curUser: LoggedInUser = null;
  private tokenExpirationTimer: any;
  rootPath = 'http://192.168.1.72:5500';

  constructor(private http: HttpClient,
              private productsService: ProductsService,
              private router: Router,
              private loginFormService: LoginFormService) {
  }

  login(username: string, password: string): void {
    this.http
      .post(this.rootPath + '/auth/login', {username, password})
      .pipe(
        tap(l => {
          this.handleAuth(l);
          this.router.navigate(['/profile']);
        }),
        catchError(err => {
          this.loginFormService.wrongPassword();
          return throwError('Incorrect username or password');
        })
      ).subscribe();
  }

  handleAuth(l: any): void {
    this.curUser = new LoggedInUser(l.user.username, l.user.admin, l.user.email, l.token,
      new Date(new Date().getTime() + l.expiresIn));
    this.autoLogout(l.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(this.curUser));
    this.loginFormService.correctPassword();
  }

  syncAllProducts(): void {
    this.http
      .get<Product[]>(this.rootPath + '/products')
      .pipe(
        tap((products: Product[]) => {
          this.productsService.setProducts(products);
        })
      ).subscribe();
  }

  autoLogin(): void {
    const userData: {
      username: string,
      admin: boolean,
      email: string,
      token: string,
      expires: Date
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new LoggedInUser(
      userData.username,
      userData.admin,
      userData.email,
      userData.token,
      userData.expires
    );

    if (loadedUser.token) {
      this.curUser = loadedUser;
      const expirationDuration = new Date(userData.expires).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.curUser = null;
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}
