import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Product } from '../../models/products/products.model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductsService } from '../../service/products.service';
import { MatButtonModule } from '@angular/material/button';
import { NavHeaderComponent } from "../shared/nav-header/nav-header.component";
import { MatInput, MatFormField, MatLabel } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { concatMap, debounceTime, distinctUntilChanged, from, merge, mergeMap, Subject, switchMap, takeUntil } from 'rxjs';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, MatButtonModule, NavHeaderComponent, MatInput, MatFormField, MatLabel, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit , OnDestroy{
  private productService = inject(ProductsService);
  searchProduct = signal('');
  searchSubject$ = new Subject<string>();
  destroy$ = new Subject<void>();
  products: Product[] = [];
  constructor() {
    // effect(() =>{
    //   this.products = this.productService.productsList();
    // })
    toObservable(this.searchProduct).pipe(
      debounceTime(300),
      switchMap(term => this.productService.getProductListForSearch(term))
    ).subscribe(recivedProducts => {
      this.products = recivedProducts;
    })
  }
  ngOnInit(): void {
    this.productService.getProductList();
    // this.searchSubject$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   takeUntil(this.destroy$),
    // ).subscribe(searchValue => {
    //   this.productService.getProductListForSearch(searchValue);
    // })
    // const mergeMapExample$ =  merge(
    //   this.productService.getProductDummy(),
    //   this.productService.getProductDummy()
    // ).pipe(mergeMap(apiCalls => apiCalls));


    const listOfProductIdsToUpdate = [1,2,3,4];
    from(listOfProductIdsToUpdate).pipe(
      concatMap(id => this.productService.updateProduct(id))
    ).subscribe({
      next:() => console.log("Save!"),
      complete:() => console.log("called all API calls one by one")
    })
  }
  searchProducts(searchValue: string) {
    this.productService.getProductListForSearch(searchValue);
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.complete();
  }
}
