import { Component, effect, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { Product } from '../../models/products/products.model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductsService } from '../../service/products.service';
import { MatButtonModule } from '@angular/material/button';
import { NavHeaderComponent } from "../shared/nav-header/nav-header.component";
import { MatInput, MatFormField, MatLabel } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, MatButtonModule, NavHeaderComponent, MatInput, MatFormField, MatLabel, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit , OnDestroy{
  private productService = inject(ProductsService);
  searchProduct = '';
  searchSubject$ = new Subject<string>();
  destroy$ = new Subject<void>();
  products: Product[] = [];
  constructor() {
    effect(() =>{
      this.products = this.productService.productsList();
    })
  }
  ngOnInit(): void {
    this.productService.getProductList();
    this.searchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(searchValue => {
      this.productService.getProductListForSearch(searchValue);
    })
  }
  searchProducts(searchValue: string) {
    this.productService.getProductListForSearch(searchValue);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
