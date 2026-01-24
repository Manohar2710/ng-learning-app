import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
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
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [MatCard, MatCardTitle, MatCardContent, MatButton, MatCardHeader, MatCardActions, MatIcon, FormsModule, AllowOnlyNumbersDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  
  private routes = inject(Router);
  private cartService = inject(CartService);
  @Input() productDetails!: ProductCard;
  cartDetails!: CartDetails;
  quantity = signal(0);
  ngOnInit(): void {
    this.quantity.set(this.productDetails.userAddedQuantity ?? 0);
  }
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
    this.quantity.set(productFound?.addedQuantity ?? 0);
    // this.productDetails.userAddedQuantity = productFound?.addedQuantity ?? 0;
  }
  removeProduct() {
    this.cartService.updatePoductToCart(this.productDetails, productAction.REMOVE);
    this.updateProductData();
  }
}
