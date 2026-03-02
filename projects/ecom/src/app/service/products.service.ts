import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductFilterState, ProductSortBy } from '../models/products/products.model';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiURl;
  private httpClient = inject(HttpClient);
  constructor() {}

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/api/products`).pipe(
      retry(1),
      catchError((err) => {
        console.error('getProductList failed', err);
        return of([]);
      })
    );
  }

  getProductDummy(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/api/produc/1`).pipe(
      retry(3),
      catchError((err) => {
        console.error('get Product failed', err);
        return of([]);
      })
    );
  }

  updateProduct(id: number): Observable<Product[]> {
    return this.httpClient.post<Product[]>(`${this.apiUrl}/api/product/update/${id}`, null).pipe(
      retry(2),
      catchError((err) => {
        console.error('updateProduct failed', err);
        return of([]);
      })
    );
  }

  getProduct(id: number): Observable<Product | null> {
    return this.httpClient.get<Product>(`${this.apiUrl}/api/product/${id}`).pipe(
      catchError((err) => {
        console.error('getProduct failed', err);
        return of(null);
      })
    );
  }

  getProductListForSearch(searchInput: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.apiUrl}/api/product/search?keyword=${encodeURIComponent(searchInput)}`
    ).pipe(
      catchError((err) => {
        console.error('getProductListForSearch failed', err);
        return of([]);
      })
    );
  }

  getDiscountedPrice(product: Product): number {
    const discount = product.discount ?? 0;
    return product.price - product.price * (discount / 100);
  }

  getStockStatus(product: Product): 'out' | 'low' | 'in' {
    if (product.stockQuantity <= 0) {
      return 'out';
    }
    if (product.stockQuantity <= 5) {
      return 'low';
    }
    return 'in';
  }

  filterAndSortProducts(products: Product[], filterState: ProductFilterState): Product[] {
    const searchTerm = filterState.searchTerm.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesSearch = !searchTerm
        || product.name.toLowerCase().includes(searchTerm)
        || product.description.toLowerCase().includes(searchTerm)
        || product.category.toLowerCase().includes(searchTerm);
      const matchesCategory = filterState.category === 'all' || product.category === filterState.category;
      const matchesStock = !filterState.inStockOnly || product.stockQuantity > 0;
      return matchesSearch && matchesCategory && matchesStock;
    });
    return this.sortProducts(filtered, filterState.sortBy);
  }

  private sortProducts(products: Product[], sortBy: ProductSortBy): Product[] {
    const sortedProducts = [...products];
    switch (sortBy) {
      case 'priceLowToHigh':
        return sortedProducts.sort((a, b) => this.getDiscountedPrice(a) - this.getDiscountedPrice(b));
      case 'priceHighToLow':
        return sortedProducts.sort((a, b) => this.getDiscountedPrice(b) - this.getDiscountedPrice(a));
      case 'discountHighToLow':
        return sortedProducts.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
      case 'nameAToZ':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        return sortedProducts;
    }
  }
}
