import { Component } from '@angular/core';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public rolls: IProductResponce[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getRolls();
  }

  getRolls(): void {
    this.productService.getAll().subscribe(data => {
      this.rolls = data;
    })
  }
  
}
