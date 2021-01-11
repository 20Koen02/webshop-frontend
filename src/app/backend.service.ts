import { Injectable } from '@angular/core';
import {LoggedInUser} from './shared/logged-in-user.model';
import {HttpClient} from '@angular/common/http';
import {Product} from './shared/product.model';
import {map, tap} from 'rxjs/operators';
import {ProductsService} from './shop/products.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  curUser: LoggedInUser = null;
  rootPath = 'http://localhost:5500';

  constructor(private http: HttpClient, private productsService: ProductsService) {
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
}
