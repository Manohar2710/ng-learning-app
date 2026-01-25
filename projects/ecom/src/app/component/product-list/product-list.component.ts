import { Component, effect, inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/products/products.model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductsService } from '../../service/products.service';
import { MatButtonModule } from '@angular/material/button';
import { NavHeaderComponent } from "../shared/nav-header/nav-header.component";
import { MatInput, MatFormField, MatLabel } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { catchError, concatMap, debounceTime, distinctUntilChanged, from, merge, mergeMap, of, Subject, switchMap, takeUntil } from 'rxjs';


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
  products: Signal<Product[]> = signal([]);

  // to signal example
  // products = toSignal(
  //   this.productService.getProductList(),
  //   {initialValue: []}
  // );;
  constructor() {
    // effect(() =>{
    //   this.products = this.productService.productsList();
    // })
    // to observables example
    this.products = toSignal(
      toObservable(this.searchProduct).pipe(
        debounceTime(300),
        switchMap(term => this.productService.getProductListForSearch(term))
      ),
      {initialValue: []}
    )
  }
  ngOnInit(): void {
    this.productService.getProductList();
    this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(searchValue => {
      this.productService.getProductListForSearch(searchValue).pipe(
        catchError(err => {
        console.error("Search Failed", err)
        return of([]);
      } ));
    })
    // const mergeMapExample$ =  merge(
    //   this.productService.getProductDummy(),
    //   this.productService.getProductDummy()
    // ).pipe(mergeMap(apiCalls => apiCalls));
    // console.log(mergeMapExample$);

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
