import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionsRoutingModule} from "./actions-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ActionsComponent} from "./actions.component";
import {ActionsInfoComponent} from "./actions-info/actions-info.component";



@NgModule({
  declarations: [
    ActionsComponent,
    ActionsInfoComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    SharedModule
  ]
})
export class ActionsModule { }
