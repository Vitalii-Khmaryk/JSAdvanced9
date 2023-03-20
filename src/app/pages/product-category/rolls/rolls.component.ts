import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private productService: ProductService,
    private actvatedRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getRolls();  
  }

  getRolls(): void{
    const categoryName=this.actvatedRoute.snapshot.paramMap.get('') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.rolls = data;
    })
  }

}
