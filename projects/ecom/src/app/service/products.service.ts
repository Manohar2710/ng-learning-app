import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Products } from '../models/products/products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient = inject(HttpClient);
  productsList : WritableSignal<Products[]>= signal<Products[]>([]);
  constructor() { }

  getProductList(){
    this.httpClient.get<Products[]>("http://localhost:8080/api/products").subscribe(res => {
      this.productsList.set(res);
    });
  }
}
