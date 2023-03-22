import { Component, OnInit,OnDestroy } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { ROLE } from 'src/app/shared/constants/role.constant';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit,OnDestroy {
  public authForm!:FormGroup;
  public authRegistForm!:FormGroup;
  public loginSubsription!:Subscription;
  
  public regVar=true;
  constructor(
    private fb:FormBuilder,
    private accountService:AccountService,
    private router:Router,
    private auth:Auth,
    private afs:Firestore,
    private toastr:ToastrService,
    private dialogRef:MatDialogRef<AuthDialogComponent>
    ){}
  
  ngOnInit():void{
    this.initAuthForm();
    this.initauthRegistForm();
  }
  ngOnDestroy():void{
  this.loginSubsription.unsubscribe();
  }
  
  initAuthForm(){
    this.authForm=this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
   }
  
   initauthRegistForm(){
    this.authRegistForm=this.fb.group({
      userName:[null,[Validators.required]],
      userSurname:[null,[Validators.required]],
      phoneNumber:[null,[Validators.required]],
      userEmail:[null,[Validators.required,Validators.email]],
      userPassword:[null,[Validators.required]],
      repeatPassword:[null,[Validators.required]],
    })
   }
  
   dialogClose():void{
    this.dialogRef.close();
   }
  
  
  login():void{
    const {email,password}=this.authForm.value;
    this.loginAsync(email,password).then(()=>{
      this.toastr.success('User successfully login');
    }).catch(e=>{
      this.toastr.error(e);
    })
  }
  
  async loginAsync(email:string,password:string):Promise<void>{
  const credential=await signInWithEmailAndPassword(this.auth,email,password);
  this.loginSubsription=docData(doc(this.afs,'users',credential.user.uid)).subscribe(user=>{
  const currentUser={...user,uid:credential.user.uid};
  localStorage.setItem('currentUser',JSON.stringify(currentUser));
    if (user && user['role']===ROLE.USER) {
            this.router.navigate(['/cabinet']);
          } else if(user && user['role']===ROLE.ADMIN){
            this.router.navigate(['/admin']);
          } 
          this.accountService.isUserLogin$.next(true);
  },(error)=>{
    console.log(error);
  })
  }
  
  
  registShow():void{
  this.regVar=!this.regVar;
  }
  
  registerUser():void{
    const {userEmail,userPassword}=this.authRegistForm.value;
  this.emailSignUp(userEmail,userPassword).then(()=>{
    this.toastr.success('User successfully created');
    this.regVar=!this.regVar;
    this.authForm.reset();
    this.authRegistForm.reset();
  }).catch(e=>{
    this.toastr.error(e);
  })
  }
  async emailSignUp(userEmail:string,userPassword:string):Promise<any>{
    const credential=await createUserWithEmailAndPassword(this.auth,userEmail,userPassword);
    const {userName,userSurname,phoneNumber}=this.authRegistForm.value;
  const user={
    email:credential.user.email,
    firstName:userName,
    lastName:userSurname,
    phoneNumber:phoneNumber,
    address:'',
    orders:[],
    role:'USER'
  };
  setDoc(doc(this.afs,'users',credential.user.uid),user);
  }
}
