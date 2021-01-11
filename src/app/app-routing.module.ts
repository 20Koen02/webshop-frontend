import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShopComponent} from './shop/shop.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
