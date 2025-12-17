import { Component, effect, inject, OnInit } from '@angular/core';
import { Products } from '../../models/products/products.model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductsService);
  constructor() {
    effect(() =>{
      this.products = this.productService.productsList();
    })
  }
  ngOnInit(): void {
    this.productService.getProductList();

  }
  products: Products[] = [];
}
