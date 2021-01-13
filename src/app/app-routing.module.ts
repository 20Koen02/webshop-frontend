import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop/shop.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {CartComponent} from './cart/cart.component';
import {LoggedInUser} from './shared/logged-in-user.model';
import {LoginComponent} from './login/login.component';
import {AppAuthGuard} from './app-auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'profile', canActivate: [AppAuthGuard], component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
