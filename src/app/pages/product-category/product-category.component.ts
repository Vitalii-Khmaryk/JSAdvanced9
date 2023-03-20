import { Component,OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit,OnDestroy {
  public userProducts: Array<IProductResponce> = [];
  private eventSubsription!:Subscription;

  constructor(
    private productService: ProductService,
    private actvatedRoute:ActivatedRoute,
    private router:Router
  ){
  this.eventSubsription=this.router.events.subscribe(event=>{
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
  }


  loadProducts(): void{
    const categoryName=this.actvatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.userProducts = data;
    })
  }
  ngOnDestroy(): void {
      this.eventSubsription.unsubscribe();
  }
}
