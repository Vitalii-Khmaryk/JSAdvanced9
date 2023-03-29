import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionRequest, IActionResponse } from '../../interfaces/action/action.interface';
import {Firestore, CollectionReference, doc, updateDoc, deleteDoc,addDoc,docData, collectionData} from "@angular/fire/firestore";
import {DocumentData,collection} from "@firebase/firestore";



@Injectable({
  providedIn: 'root'
})
export class ActionService implements Resolve<Observable<DocumentData>> {

  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/actions` }
  private categoryCollection!:CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
  private afs:Firestore
  ) {
    this.categoryCollection=collection(this.afs,'actions');
  }

  getAllFirebase(){
    return collectionData(this.categoryCollection, {idField:'id'});
  }
  getOneFirebase(id:string){
    const categoryDocumentReference=doc(this.afs,`actions/${id}`);
   return docData(categoryDocumentReference, {idField:'id'});
  }
  resolve(route:ActivatedRouteSnapshot):Observable<DocumentData>{
    const categoryDocumentReference=doc(this.afs,`actions/${route.paramMap.get('id')}`);
    return docData(categoryDocumentReference, {idField:'id'});
  }
  createFirebase(action: IActionRequest) {
    return addDoc(this.categoryCollection,action);
  }
  updateFirebase(action: IActionRequest, id: string){
    const categoryDocumentReference=doc(this.afs,`actions/${id}`);
    return updateDoc(categoryDocumentReference,{...action});
  }
  deleteFirebase(id:string){
    const categoryDocumentReference=doc(this.afs,`actions/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
}
