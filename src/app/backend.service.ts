import {Injectable} from '@angular/core';
import {LoggedInUser} from './shared/logged-in-user.model';
import {HttpClient} from '@angular/common/http';
import {Product} from './shared/product.model';
import {catchError, map, tap} from 'rxjs/operators';
import {ProductsService} from './shop/products.service';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {LoginFormService} from './login/login-form/login-form.service';
import {EditService} from './profile/edit/edit.service';
import {User} from './shared/user.model';
import {UserService} from './management/users/user.service';
import {Order} from './shared/order.model';
import {ManageOrderService} from './management/orders/order.service';
import {OrderProduct} from './shared/order-product.model';
import {CartProduct} from './shared/cart-product.model';
import {CartService} from './cart/cart.service';
import {UserOrderService} from './profile/orders/order.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  curUser: LoggedInUser = null;
  private tokenExpirationTimer: any;
  rootPath = 'https://iprwc-api.koen02.nl';

  constructor(private http: HttpClient,
              private productsService: ProductsService,
              private router: Router,
              private loginFormService: LoginFormService,
              private editService: EditService,
              private userService: UserService,
              private manageOrderService: ManageOrderService,
              private userOrderService: UserOrderService,
              private cartService: CartService) {
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

  syncAllUsers(): void {
    this.http
      .get<User[]>(this.rootPath + '/users')
      .pipe(
        tap((users: User[]) => {
          this.userService.setUsers(users);
        })
      ).subscribe();
  }

  syncMyOrders(): void {
    this.http
      .get<any[]>(this.rootPath + '/orders/' + this.curUser.username)
      .pipe(
        tap((orders: any[]) => {
          const allOrders: Order[] = [];
          for (const order of orders) {
            const orderUser: User = order.user as User;
            const orderProducts: OrderProduct[] = order.products.map((p: any) => p as OrderProduct);
            allOrders.push(new Order(order.id, orderUser, orderProducts, new Date(order.orderDate), order.totalPrice));
          }
          this.userOrderService.setOrders(allOrders);

        })
      ).subscribe();
  }


  syncAllOrders(): void {
    this.http
      .get<any[]>(this.rootPath + '/orders')
      .pipe(
        tap((orders: any[]) => {
          const allOrders: Order[] = [];
          for (const order of orders) {
            const orderUser: User = order.user as User;
            const orderProducts: OrderProduct[] = order.products.map((p: any) => p as OrderProduct);
            allOrders.push(new Order(order.id, orderUser, orderProducts, new Date(order.orderDate), order.totalPrice));
          }
          this.manageOrderService.setOrders(allOrders);

        })
      ).subscribe();
  }

  syncCart(): void {
    this.http
      .get<any>(this.rootPath + '/carts/' + this.curUser.username)
      .pipe(
        tap((cart: any) => {
          const cartProducts: CartProduct[] = cart.products.map((p: any) => {
            return new CartProduct(p.id, p.product.name, p.product.description,
              p.product.price, p.product.image, p.product.deleted, p.quantity);
          });
          this.cartService.products = cartProducts;
        })
      ).subscribe();
  }


  deleteUser(user: User): void {
    this.http
      .delete(this.rootPath + '/users/' + encodeURIComponent(user.username))
      .pipe(
        tap((l) => {
          this.userService.deleteUser(user);
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

  register(email: string, username: string, password: string, recaptcha: string): void {
    this.http
      .post(this.rootPath + '/users', {email, username, password, admin: false, 'g-recaptcha-response': recaptcha})
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

  addUser(username: string, password: string, admin: boolean, email: string): void {
    this.http
      .post(this.rootPath + '/users', {email, username, password, admin})
      .pipe(
        tap(l => {
          this.syncAllUsers();
        })
      ).subscribe();
  }


  addOrder(totalPrice: number, products: CartProduct[]): void {
    this.http
      .post(this.rootPath + '/orders/' + this.curUser.username, {totalPrice})
      .pipe(
        tap(id => {
          this.addProductsToOrder(products, String(id));
        }),
        catchError(err => {
          this.cartService.errorOrdering(String(err.error));
          return throwError('Order Limit Reached');
        })
      ).subscribe();
  }

  addProductsToOrder(products: CartProduct[], id: string): void {
    this.http
      .post(this.rootPath + '/orders/' + this.curUser.username + '/' + id + '/products', products)
      .pipe(
        tap(l => {
          this.setCart([]);
          this.cartService.setOrderSuccess(true);
          this.cartService.products = [];
        })
      ).subscribe();
  }

  setCart(products: CartProduct[]): void {
    this.http
      .post(this.rootPath + '/carts/' + this.curUser.username + '/products', products)
      .pipe(
        tap(l => {
        })
      ).subscribe();
  }

  handleAuth(l: any): void {
    this.curUser = new LoggedInUser(l.user.username, l.user.admin, l.user.email, l.token,
      new Date(new Date().getTime() + l.expiresIn * 1000));
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
