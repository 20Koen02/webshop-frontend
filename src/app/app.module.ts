import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { ManageUsersComponent } from './management/users/users.component';
import { ManageProductsComponent } from './management/products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { EditComponent } from './profile/edit/edit.component';
import { UserOrdersComponent} from './profile/orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ProductModalComponent } from './shop/product-modal/product-modal.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import {AuthInterceptorService} from './app-interceptor.service';
import { ProductAddModalComponent} from './management/products/product-add-modal/product-add-modal.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {UserAddModalComponent} from './management/users/user-add-modal/user-add-modal.component';
import {ManageOrdersComponent} from './management/orders/orders.component';
import { OrderModalComponent } from './order-modal/order-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementComponent,
    ManageUsersComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ProfileComponent,
    EditComponent,
    CartComponent,
    ShopComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ProductModalComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProductAddModalComponent,
    UserAddModalComponent,
    UserOrdersComponent,
    OrderModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
