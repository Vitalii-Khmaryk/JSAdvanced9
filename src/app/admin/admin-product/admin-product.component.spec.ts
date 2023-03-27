import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {Storage} from "@angular/fire/storage";
import {ToastrService} from "ngx-toastr";
import {IProductResponce} from "../../shared/interfaces/product/product.interface";

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;
  const products: IProductResponce[] = [
    {
      id: 1,
      category: { id: 1, name: 'qqq', path: 'qqq', imagePath: 'iqq' },
      name: 'qqq',
      path: 'qqq',
      ingredients: 'qqq',
      weight: '10',
      price: 10,
      imagePath: 'qqq',
      count: 1,
    },
  ];
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide:Storage,useValue:{}},
        {provide:ToastrService,useValue:{}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getProducts', () => {
    spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
  });
  it('should initialize product form', () => {
    expect(component.productForm.value).toEqual({
      category: null,
      name: null,
      path: null,
      ingredients: null,
      weight: null,
      price: null,
      imagePath: null,
      count: 1,
    });
  });
  it('should set form values when editing a product', () => {
    const product: IProductResponce = products[0];
    component.editProduct(product);
    expect(component.isUploaded).toBe(true);
    expect(component.editStatus).toBe(true);
    expect(component.addProductStatus).toBe(true);
  });
  it('should set form values when save a product', () => {
    component.saveNewProduct();
    expect(component.isUploaded).toBe(false);
    expect(component.editStatus).toBe(false);
    expect(component.addProductStatus).toBe(false);
  });
  it('should set form values when delete a product', () => {
    const product: IProductResponce = products[0];
    component.deleteProduct(product);
    expect(component.loadCategories).toBeTruthy();
  });
});
