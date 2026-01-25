import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../models/products/products.model';
import { environment } from '../../environments/environment';


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
  getProduct(id: string | null) {
    this.httpClient.get<Product>(`${this.apiUrl}/api/product/${id}`).subscribe(res => {
      this.product.set(res);
    });
  }
}
