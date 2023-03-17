import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { RollsComponent } from './pages/product-category/rolls/rolls.component';
import { SetsComponent } from './pages/product-category/sets/sets.component';
import { DrinksComponent } from './pages/product-category/drinks/drinks.component';
import { SaucesComponent } from './pages/product-category/sauces/sauces.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'actions', component: ActionsComponent},
  {path: 'dostavka-ta-oplata', component: DostavkaTaOplataComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'product-category', component: ProductCategoryComponent, children: [
    {path: 'rolls', component: RollsComponent},
    {path: 'sets', component: SetsComponent},
    {path: 'drinks', component: DrinksComponent},
    {path: 'sauces', component: SaucesComponent}
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'category', component: AdminCategoryComponent},
    {path: 'order', component: AdminOrderComponent},
    {path: 'product', component: AdminProductComponent},
    {path: 'action', component: AdminActionsComponent},
    {path: '', pathMatch: 'full', redirectTo: 'action'}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
