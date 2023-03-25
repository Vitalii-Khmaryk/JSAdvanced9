import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductCategoryComponent} from "./product-category.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {ProductService} from "../../shared/services/product/product.service";




const routes: Routes = [
  {path:'',component: ProductCategoryComponent},
  {path:':id',component:ProductInfoComponent,
    resolve:{
      productInfo:ProductService
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCategoryRoutingModule { }
