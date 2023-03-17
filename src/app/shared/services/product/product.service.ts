  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IProductRequest, IProductResponce } from '../../interfaces/product/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` }

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IProductResponce[]> {
    return this.http.get<IProductResponce[]>(this.api.products);
  }

  getAllByCategory(name: string): Observable<IProductResponce[]>{
    return this.http.get<IProductResponce[]>(`${this.api.products}?category.path=${name}`);
  }

  createProduct(product: IProductRequest): Observable<IProductResponce> {
    return this.http.post<IProductResponce>(this.api.products, product);
  }

  updateProduct(product: IProductRequest, id: number): Observable<IProductResponce> {
    return this.http.patch<IProductResponce>(`${this.api.products}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`)
  }
}
