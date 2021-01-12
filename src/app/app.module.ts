import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { UsersComponent } from './management/users/users.component';
import { ProductsComponent } from './management/products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { OrdersComponent } from './profile/orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProductModalComponent } from './shop/product-modal/product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementComponent,
    UsersComponent,
    ProductsComponent,
    ProfileComponent,
    EditComponent,
    OrdersComponent,
    CartComponent,
    ShopComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
