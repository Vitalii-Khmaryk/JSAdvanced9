import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelDialogComponent } from './tel-dialog.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";

describe('TelDialogComponent', () => {
  let component: TelDialogComponent;
  let fixture: ComponentFixture<TelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelDialogComponent ],
      imports:[
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers:[
        {provide:MatDialogRef,useValue:{}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize  phone form', () => {
    expect(component.authForm.value).toEqual({ name: null, phoneNumber: null });
  });
});
