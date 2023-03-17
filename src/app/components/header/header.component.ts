import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

const showCloseMenu = trigger('showCloseMenu', [
  state('show', style({
    opacity: 1,
    transform: 'translate(0px, 0%)',
  })),
  state('close', style({
    opacity: 0,
    transform: 'translate(0px, -100%)',
  })),
  transition('show => close', [animate('0.5s ease-in')]),
  transition('close => show', [animate('0.5s ease-out')])
]);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [showCloseMenu]
})
export class HeaderComponent {

  public status = false;
  
  showSloceMenu(): void{
    this.status = !this.status;
  }

}
