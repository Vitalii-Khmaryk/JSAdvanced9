import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatDialogModule} from "@angular/material/dialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ICategoryResponce} from "../../shared/interfaces/category/category.interface";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[
        HttpClientTestingModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should change total', () => {
    const FAKE_BASKET=[
      {
        id:1,
        category: {
          id:2,
          name: 'string',
          path: 'string',
          imagePath: 'string',
        },
        name: 'string',
        path:'string',
        ingredients: 'string',
        weight: 'string',
        price: 10,
        imagePath: 'string',
        count:1
      }
    ]
    component.basket=FAKE_BASKET;
    spyOn(component,'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(10);
    component.basket=[];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });
});


