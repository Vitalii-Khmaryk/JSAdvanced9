import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { IProductResponce } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import {TelDialogComponent} from "../tel-dialog/tel-dialog.component";

const showCloseMenu = trigger('showCloseMenu', [
  state(
    'show',
    style({
      opacity: 1,
      transform: 'translate(0px, 0%)',
    })
  ),
  state(
    'close',
    style({
      opacity: 0,
      transform: 'translate(0px, -100%)',
    })
  ),
  transition('show => close', [animate('0.5s ease-in')]),
  transition('close => show', [animate('0.5s ease-out')]),
]);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [showCloseMenu],
})
export class HeaderComponent {
  public total = 0;
  public basket: Array<IProductResponce> = [];
  public count = 0;
  public status = false;
  public blurStatus = false;
  public empty = true;
  public isLogin=false;
  public loginUrl='';
  public loginPage='';



  constructor(private orderService: OrderService,
    private accountService:AccountService,
    private dialog:MatDialog
    ) {}
  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdateUserLogin();
  }

  showSloceMenu(): void {
    this.status = !this.status;
  }
  loadBasket() {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }
  getTotalPrice() {
    this.total = this.basket.reduce(
      (total: number, prod: IProductResponce) =>
        total + prod.count * prod.price,
      0
    );
    this.count = this.basket.reduce(
      (total: number, prod: IProductResponce) => total + prod.count,
      0
    );
  }
  updateBasket() {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }
  showBasket() {

    this.blurStatus = !this.blurStatus;
    let basketArr = JSON.parse(localStorage.getItem('basket') as string);
    if (basketArr === null) {
      console.log('масив не існує');
    } else if (basketArr.length === 0) {
      console.log('пусто шов кошик');
    } else {
      console.log('наповнений шов кошик');
      this.empty = false;
    }
  }

  localDelete(item: any): void {
    console.log(this.basket);
    const index = this.basket.findIndex((prod) => prod.id === item.id);
    this.basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    console.log(this.basket);
    let basketArr = JSON.parse(localStorage.getItem('basket') as string);
    if (basketArr === null) {
      console.log('масив не існує');
    } else if (basketArr.length === 0) {
      this.empty = true;
      this.count = 0;
      this.total = 0;
      console.log('пусто');
    } else {
      console.log('наповнений');
      this.empty = false;
    }
  }

  productCount(product: IProductResponce, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
  catalog(): void {
    this.blurStatus = false;
  }
  checkUserLogin():void{
    const currentUser=JSON.parse(localStorage.getItem('currentUser') as string);
   if (currentUser && currentUser.role===ROLE.ADMIN) {
    this.isLogin=true;
    this.loginUrl='admin';
    this.loginPage='Admin';
   }else if(currentUser && currentUser.role===ROLE.USER) {
    this.isLogin=true;
    this.loginUrl='cabinet';
    this.loginPage='Cabinet';
   }
   else{
    this.isLogin=false;
    this.loginUrl='';
    this.loginPage='';
   }
  }

  checkUpdateUserLogin():void{
    this.accountService.isUserLogin$.subscribe(()=>{
      this.checkUserLogin();
    })
  }
  openLoginDialog():void{
this.dialog.open(AuthDialogComponent,{
  backdropClass:'dialog-back',
  panelClass:'auth-dialog'
})}

  openTelDialog():void{
    this.dialog.open(TelDialogComponent,{
      backdropClass:'dialog-back',
      panelClass:'auth-dialog'
    })
  }

}
