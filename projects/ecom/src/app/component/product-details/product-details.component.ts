import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { NavHeaderComponent } from '../shared/nav-header/nav-header.component';
import { Product } from '../../models/products/products.model';
import { MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../service/products.service';
import { CartService } from '../../service/cart.service';
import { productAction } from '../../models/cart.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavHeaderComponent, MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatButtonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private activatedRoutes = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private cartService = inject(CartService);
  readonly loading = signal(false);
  readonly productInfo = signal<Product | null>(null);
  readonly discountedPrice = computed(() => {
    const product = this.productInfo();
    return product ? this.productService.getDiscountedPrice(product) : 0;
  });
  readonly stockStatus = computed(() => {
    const product = this.productInfo();
    return product ? this.productService.getStockStatus(product) : 'out';
  });
  readonly quantity = computed(() => {
    const product = this.productInfo();
    return product ? this.cartService.getProductQuantity(product.id) : 0;
  });

  ngOnInit(): void {
    this.activatedRoutes.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (Number.isNaN(id)) {
        this.productInfo.set(null);
        return;
      }
      this.fetchProduct(id);
    });
  }

  addProduct() {
    const product = this.productInfo();
    if (!product || product.stockQuantity <= 0) {
      return;
    }
    this.cartService.updatePoductToCart(product, productAction.ADD);
  }

  removeProduct() {
    const product = this.productInfo();
    if (!product) {
      return;
    }
    this.cartService.updatePoductToCart(product, productAction.REMOVE);
  }

  getStockLabel(): string {
    const product = this.productInfo();
    if (!product) {
      return '';
    }
    if (this.stockStatus() === 'out') {
      return 'Out of stock';
    }
    if (this.stockStatus() === 'low') {
      return `Hurry, only ${product.stockQuantity} left`;
    }
    return `${product.stockQuantity} units available`;
  }

  private fetchProduct(id: number) {
    this.loading.set(true);
    this.productService.getProduct(id).subscribe((product) => {
      this.productInfo.set(product);
      this.loading.set(false);
    });
  }
}
