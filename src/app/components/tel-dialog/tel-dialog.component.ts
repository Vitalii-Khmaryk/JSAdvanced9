import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-tel-dialog',
  templateUrl: './tel-dialog.component.html',
  styleUrls: ['./tel-dialog.component.scss']
})
export class TelDialogComponent {
  public authForm!:FormGroup;
  constructor(
    private dialogRef:MatDialogRef<TelDialogComponent>,
    private fb:FormBuilder,

  ) {}
  ngOnInit():void{
    this.initAuthForm();
  }
  dialogClose():void{
    this.dialogRef.close();
  }
  initAuthForm(){
    this.authForm=this.fb.group({
      name:[null,Validators.required],
      phoneNumber:[null,Validators.required]
    })
  }
  login():void{}
}
