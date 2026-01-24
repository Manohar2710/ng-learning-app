import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../models/products/products.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiURl;
  private httpClient = inject(HttpClient);
  productsList : WritableSignal<Product[]>= signal<Product[]>([]);
  product : WritableSignal<Product> = signal<Product>({});
  constructor() { }

  getProductList(){
    this.httpClient.get<Product[]>(`${this.apiUrl}/api/products`).subscribe(res => {
      this.productsList.set(res);
    });
  }
  getProductDummy(){
    return this.httpClient.get<Product[]>(`${this.apiUrl}/api/product/1`);
  }
  updateProduct(id: number) {
    return this.httpClient.post<Product[]>(`${this.apiUrl}/api/product/update/${id}`, null);
  }
  getProduct(id: string | null) {
    this.httpClient.get<Product>(`${this.apiUrl}/api/product/${id}`).subscribe(res => {
      this.product.set(res);
    });
  }
  getProductListForSearch(searchInput: string | null): Observable<Product[]> {
   return this.httpClient.get<Product[]>(`${this.apiUrl}/api/product/search?keyword=${searchInput}`);
    
  }
}
