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
import {EditService} from './profile/edit/edit.service';
import {AddModalComponent} from './management/products/add-modal/add-modal.component';
import {AddModalService} from './management/products/add-modal.service';

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
              private loginFormService: LoginFormService,
              private editService: EditService) {
  }

  editUser(editData: { email: string, password: string }): void {
    this.http
      .put(this.rootPath + '/users/' + encodeURIComponent(this.curUser.username), editData)
      .pipe(
        tap(l => {
          this.router.navigate(['/profile'], {fragment: 'edit'});
          this.editService.reset();
          this.editService.isSuccess();
        }),
        catchError(err => {
          this.editService.reset();
          this.editService.isFailed();
          console.log(err);
          return throwError('Could not edit');
        })
      ).subscribe();
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

  deleteProduct(product: Product): void {
    this.http
      .delete(this.rootPath + '/products/' + encodeURIComponent(product.id))
      .pipe(
        tap((l) => {
          this.productsService.deleteProduct(product);
        })
      ).subscribe();
  }

  updateProduct(product: Product, property: string, text: string): void {
    const data = {};
    data[property] = text;
    this.http
      .put(this.rootPath + '/products/' + encodeURIComponent(product.id), data)
      .pipe(
        tap((l) => {
          this.productsService.updateProduct(product, property, text);
        })
      ).subscribe();
  }

  addProduct(name: string, description: string, price: number, image: string): void {
    this.http
      .post(this.rootPath + '/products', {name, description, price, image})
      .pipe(
        tap((l) => {
          this.syncAllProducts();
        })
      ).subscribe();
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
