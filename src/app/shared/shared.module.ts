import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



const MATERIAL=[
    MatDialogModule,
    MatInputModule
]


@NgModule({
    declarations:[],
    imports:[
       ...MATERIAL,
      FormsModule,
      ReactiveFormsModule
    ],
    exports:[
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule
    ]
})
export class SharedModule {}
