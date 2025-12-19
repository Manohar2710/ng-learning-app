import { Component, inject, Input } from '@angular/core';
import { Products } from '../../../models/products/products.model';
import { MatCard, MatCardTitle, MatCardContent, MatCardHeader, MatCardActions } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatButton, MatCardHeader, MatCardActions],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private routes = inject(Router);
  @Input() productDetails!: Products;

  goToProductDetail() {
    this.routes.navigate([`/product-detail/${this.productDetails.id}`])
  }
  goToEditProduct() {
    //TODO
  }
  goToDeleteProduct() {
    //TODO
  }
}
