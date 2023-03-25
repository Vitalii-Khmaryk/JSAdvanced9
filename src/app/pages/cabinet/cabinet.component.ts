import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent {
  public userEmail!: string;
  public userName!: string;
  public userPass!: string;
  public dataVar = true;
  public historyVar = false;
  public passVar = false;
  constructor(private router: Router, private accountService: AccountService) {}
  ngOnInit(): void {
    this.dataLoad();
  }

  dataLoad() {
    const currentUser = JSON.parse(
      localStorage.getItem('currentUser') as string
    );
    this.userEmail = currentUser.email;
    this.userName = currentUser.fullName;
    this.userPass = currentUser.password;
  }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
  data(): void {
    this.dataVar = true;
    this.historyVar = false;
    this.passVar = false;
  }
  history(): void {
    this.dataVar = false;
    this.historyVar = true;
    this.passVar = false;
  }
  changePass():void{
    this.dataVar = false;
    this.historyVar = false;
    this.passVar = true;
  }
}
