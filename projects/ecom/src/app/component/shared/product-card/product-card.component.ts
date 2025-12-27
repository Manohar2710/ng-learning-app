import { Component, inject, Input } from '@angular/core';
import { Product, ProductCard } from '../../../models/products/products.model';
import { MatCard, MatCardTitle, MatCardContent, MatCardHeader, MatCardActions } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { AllowOnlyNumbersDirective } from '../../../shared/utils/allow-only-numbers.directive';
import { CartService } from '../../../service/cart.service';
import { CartDetails, productAction } from '../../../models/cart.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatButton, MatCardHeader, MatCardActions, MatIcon, FormsModule, AllowOnlyNumbersDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private routes = inject(Router);
  private cartService = inject(CartService);
  @Input() productDetails!: ProductCard;
  cartDetails!: CartDetails;
  goToProductDetail() {
    this.routes.navigate([`/product-detail/${this.productDetails.id}`])
  }
  goToEditProduct() {
    //TODO
  }
  goToDeleteProduct() {
    //TODO
  }
  addProductToCart() {
    this.cartService.updatePoductToCart(this.productDetails, productAction.ADD);
    this.updateProductData();
  }
  updateProductData() {
    const productFound = this.cartService.cartDetails?.products?.find(product => product.id === this.productDetails.id );
    this.productDetails.userAddedQuantity = productFound?.addedQuantity ?? 0;
  }
  removeProduct() {
    this.cartService.updatePoductToCart(this.productDetails, productAction.REMOVE);
    this.updateProductData();
  }
}
