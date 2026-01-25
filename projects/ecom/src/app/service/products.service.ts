import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../models/products/products.model';
import { environment } from '../../environments/environment';
import { catchError, count, delay, Observable, of, retry, shareReplay } from 'rxjs';


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
    return this.httpClient.get<Product[]>(`${this.apiUrl}/api/products`);
  }
  getProductDummy(){
    return this.httpClient.get<Product[]>(`${this.apiUrl}/api/produc/1`).pipe(
      retry(3),
      catchError(err => {
        console.error("get Product failed", err);
        return of([])
      })
    );
  }
  updateProduct(id: number) {
    return this.httpClient.post<Product[]>(`${this.apiUrl}/api/product/update/${id}`, null).pipe(
      retry({
        count: 2, 
        delay: 5000 
      }),
      catchError(err => {
        console.error("updateProduct failed", err);
        return of([])
      })
    );;
  }
  getProduct(id: string | null) {
    this.httpClient.get<Product>(`${this.apiUrl}/api/product/${id}`).pipe(
      shareReplay(1)
    ).subscribe(res => {
      this.product.set(res);
    });
  }
  getProductListForSearch(searchInput: string | null): Observable<Product[]> {
   return this.httpClient.get<Product[]>(`${this.apiUrl}/api/product/search?keyword=${searchInput}`);
    
  }
}
