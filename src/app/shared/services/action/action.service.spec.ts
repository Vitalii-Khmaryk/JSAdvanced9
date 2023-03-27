import { TestBed } from '@angular/core/testing';

import { ActionService } from './action.service';
import {HttpClientTestingModule, HttpTestingController,} from "@angular/common/http/testing";
import {environment} from "../../../../environments/environment";

describe('ActionService', () => {
  let service: ActionService;
  let backEnd: HttpTestingController;
  let url = environment.BACKEND_URL;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[ActionService]
    });
    service = TestBed.inject(ActionService);
    backEnd = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('can test HttpClient.get ', () => {
    const data = [
      {
        date:new Date(),
        name: 'qqq',
        title: 'qqq',
        description: 'qqq',
        imagePath: 'qqq',
        id: 1,
      },
    ];
    service.getAll().subscribe((response) => expect(response).toBe(data));
    const req = backEnd.expectOne(url + `/actions`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });
  it('can test HttpClient.getOne ', () => {
    const data = {
      id: 1,
      date: new Date(),
      name: 'Action 1',
      title: 'Title 1',
      description: 'Description 1',
      imagePath: 'path/to/image',
    };
    service.getOne(1).subscribe((response) => expect(response).toEqual(data));
    const req = backEnd.expectOne(url + `/actions/1`);
    expect(req.request.method).toBe('GET');
    req.flush(data);
  });
  it('can test HttpClient.post ', () => {
    const data = {
      date: new Date(),
      name: 'qqq',
      title: 'qqq',
      description: 'qqq',
      imagePath: 'qqq',
    };
    service.createAction(data).subscribe((response) => expect(response).toBeNull());
    const req = backEnd.expectOne(url + `/actions`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(data);
    req.flush(null);
  });

  it('can test HttpClient.delete ', () => {
    const id = 1;
    service.deleteAction(id).subscribe((response) => expect(response).toBeNull());
    const req = backEnd.expectOne(url + `/actions/` + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('can test HttpClient.patch ', () => {
    const data = {
      name: 'qqq',
      title: 'qqq',
      description: 'qqq',
      imagePath: 'qqq',
      date: new Date(),
    };
    const id = 1;
    service.updateAction(data, id).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = backEnd.expectOne(url + `/actions/` + id);
    expect(req.request.method).toBe('PATCH');
    req.flush(data);
  });

  afterEach(() => {
    backEnd.verify();
  });
});
