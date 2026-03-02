import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit } from '@angular/core';
import { ProductCard } from '../../../models/products/products.model';
import { MatCard, MatCardTitle, MatCardContent, MatCardHeader, MatCardActions } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { Router } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { CartService } from '../../../service/cart.service';
import { productAction } from '../../../models/cart.model';
import { DiscountBadgeDirective } from "../../../shared/discount-badge.directive";
import { CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardTitle, MatCardContent, MatButton, MatCardHeader, MatCardActions, MatIcon, DiscountBadgeDirective, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  private routes = inject(Router);
  private cartService = inject(CartService);
  private productService = inject(ProductsService);
  @Input() productDetails!: ProductCard;
  readonly quantity = computed(() => this.cartService.getProductQuantity(this.productDetails.id));
  readonly discountedPrice = computed(() => this.productService.getDiscountedPrice(this.productDetails));
  readonly stockStatus = computed(() => this.productService.getStockStatus(this.productDetails));
  readonly isOutOfStock = computed(() => this.productDetails.stockQuantity <= 0);

  ngOnInit(): void {
    if (this.productDetails.userAddedQuantity && this.quantity() === 0) {
      for (let index = 0; index < this.productDetails.userAddedQuantity; index++) {
        this.cartService.updatePoductToCart(this.productDetails, productAction.ADD);
      }
    }
  }

  goToProductDetail() {
    this.routes.navigate([`/product-detail/${this.productDetails.id}`])
  }

  addProductToCart() {
    if (this.isOutOfStock()) {
      return;
    }
    this.cartService.updatePoductToCart(this.productDetails, productAction.ADD);
  }

  removeProduct() {
    this.cartService.updatePoductToCart(this.productDetails, productAction.REMOVE);
  }

  getStockLabel(): string {
    if (this.stockStatus() === 'out') {
      return 'Out of stock';
    }
    if (this.stockStatus() === 'low') {
      return `Only ${this.productDetails.stockQuantity} left`;
    }
    return `In stock: ${this.productDetails.stockQuantity}`;
  }

  getStockClass(): string {
    return this.stockStatus();
  }
}
