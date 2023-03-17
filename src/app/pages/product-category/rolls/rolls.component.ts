import { Component } from '@angular/core';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrls: ['./rolls.component.scss']
})
export class RollsComponent {

  public rolls: IProductResponce[] = [];

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getRolls();  
  }

  getRolls(): void{
    this.productService.getAll().subscribe(data => {
      this.rolls = data;
    })
  }

}
