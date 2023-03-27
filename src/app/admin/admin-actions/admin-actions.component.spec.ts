import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { AdminActionsComponent } from './admin-actions.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IActionResponse} from "../../shared/interfaces/action/action.interface";



describe('AdminActionsComponent', () => {
  let component: AdminActionsComponent;
  let fixture: ComponentFixture<AdminActionsComponent>;
  let actions: IActionResponse[] = [
    {
      name: 'qqq',
      title: 'qqq',
      description: 'qqq',
      imagePath: 'iqq',
      date: new Date(),
      id: 1,
    },
  ];
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('DiscountService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ AdminActionsComponent ],
      imports:[
        HttpClientTestingModule,
      ],
      providers:[
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getActions', () => {
    spyOn(component, 'getActions');
    component.ngOnInit();
    expect(component.getActions).toHaveBeenCalled();
  });
  it('should set form values when editing a action', () => {
    const action: IActionResponse = actions[0];
    component.editAction(action);
    expect(component.isUploaded).toBe(true);
    expect(component.editStatus).toBe(true);
    expect(component.addActionStatus).toBe(true);
  });
  it('should set form values when save a action', () => {
    component.saveNewAction();
    expect(component.isUploaded).toBe(false);
    expect(component.editStatus).toBe(false);
    expect(component.addActionStatus).toBe(false);
  });
  it('should set form values when delete a discount', () => {
    const action: IActionResponse = actions[0];
    component.deleteAction(action);
    expect(component.getActions).toBeTruthy();
  });
});
