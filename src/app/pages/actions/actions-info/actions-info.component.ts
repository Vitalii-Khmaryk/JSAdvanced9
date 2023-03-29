import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActionResponse } from 'src/app/shared/interfaces/action/action.interface';



@Component({
  selector: 'app-actions-info',
  templateUrl: './actions-info.component.html',
  styleUrls: ['./actions-info.component.scss']
})
export class ActionsInfoComponent {
  public currentAction!:IActionResponse;
  constructor(
    private activatedRoute:ActivatedRoute
  ){}
ngOnInit():void{
  this.activatedRoute.data.subscribe(response=>{
   this.currentAction=response['actionsInfo'];
  })
}

}
