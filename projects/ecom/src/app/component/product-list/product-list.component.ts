import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/products/products.model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductsService } from '../../service/products.service';
import { MatButtonModule } from '@angular/material/button';
import { NavHeaderComponent } from "../shared/nav-header/nav-header.component";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, MatButtonModule, NavHeaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductsService);
  constructor() {
    // effect(() =>{
    //   this.products = this.productService.productsList();
    // })
  }
  ngOnInit(): void {

  }

  products = toSignal(
      this.productService.getProductList(),
      {initialValue: []}
    );;
}
