import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {FirebaseAppModule} from "@angular/fire/app";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";


describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports:[
        HttpClientTestingModule,
        FirebaseAppModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers:[
        {provide:MatDialogRef,useValue:{}},
        {provide:Auth,useValue:{}},
        {provide:Firestore,useValue:{}},
        {provide:ToastrService,useValue:{}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize auth form', () => {
    expect(component.authForm.value).toEqual({email: null, password: null});
  });

  it('should initialize register form', () => {
    expect(component.authRegistForm.value).toEqual({userEmail: null, userPassword: null,
      repeatPassword:null,userSurname:null,userName:null,phoneNumber:null});
  });

});
