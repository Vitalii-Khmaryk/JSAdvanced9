import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

import {ReactiveFormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { FirebaseApp } from '@angular/fire/app';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Storage} from "@angular/fire/storage";
import {ICategoryResponce} from "../../shared/interfaces/category/category.interface";


describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  const categories: ICategoryResponce[] = [
    { id: 1, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
    { id: 2, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
  ];
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CategoryService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryComponent ],
      imports:[
        HttpClientTestingModule,
       ReactiveFormsModule
      ],
      providers:[
        { provide: Storage, useValue: {} },
        { provide: AngularFireStorage, useValue: {} },
        { provide: FirebaseApp, useValue: {} },
        {provide:ToastrService,useValue:{}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getCategories', () => {
    spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalled();
  });
  it('should initialize category form', () => {
    expect(component.categoryForm.value).toEqual({
      name: null,
      path: null,
      imagePath: null,
    });
  });
  it('should set form values when editing a category', () => {
    const category: ICategoryResponce = categories[0];
    component.editCategory(category);
    expect(component.isUploaded).toBe(true);
    expect(component.editStatus).toBe(true);
    expect(component.addCategoryStatus).toBe(true);
  });
  it('should set form values when save a category', () => {
    component.saveNewCategory();
    expect(component.isUploaded).toBe(false);
    expect(component.editStatus).toBe(false);
    expect(component.addCategoryStatus).toBe(false);
  });
  it('should set form values when delete a category', () => {
    const category:ICategoryResponce = categories[0];
    component.deleteCategory(category);
    expect(component.getCategories).toBeTruthy();
  });
});
