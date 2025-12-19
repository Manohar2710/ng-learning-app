import { Component, effect, inject, OnInit } from '@angular/core';
import { NavHeaderComponent } from '../shared/nav-header/nav-header.component';
import { Products } from '../../models/products/products.model';
import { MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavHeaderComponent, MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productInfo: Products = {};

  activatedRoutes = inject(ActivatedRoute);
  productService = inject(ProductsService);
  constructor() {
    effect(() => {
      this.productInfo = this.productService.product();
    })
  }
  ngOnInit(): void {
    this.activatedRoutes.paramMap.subscribe(params=> {
      const id = params.get('id');
      this.productService.getProduct(id);
    })
  }
}
