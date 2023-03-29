import { Component } from '@angular/core';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import {OrderService} from "../../shared/services/order/order.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public rolls: IProductResponce[] = [];

  constructor(
    private productService: ProductService,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    this.getRolls();
  }

  getRolls(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.rolls = data as IProductResponce[];
      console.log(this.rolls);
    })
  }

  productCount(data:IProductResponce,value:boolean):void{
    if (value) {
      ++data.count;
    }
    else if (!value && data.count>1) {
      --data.count;
    }
  }

  addToBasket(data:IProductResponce):void{
    let basket:Array<IProductResponce> = [];
    if (localStorage.length>0 && localStorage.getItem('basket')) {
      basket=JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod=>prod.id===data.id)) {
        const index=basket.findIndex(prod=>prod.id===data.id);
        basket[index].count+=data.count;
      }
      else{
        basket.push(data);
      }
    }
    else{
      basket.push(data);
    }
    localStorage.setItem('basket',JSON.stringify(basket));
    data.count=1;
    this.orderService.changeBasket.next(true);
  }

}
