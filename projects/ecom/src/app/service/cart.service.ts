import { Injectable, WritableSignal, signal } from '@angular/core';
import {
  CartDetails,
  CartProducts,
  productAction as ProductAction,
} from '../models/cart.model';
import { Product } from '../models/products/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'ecom-cart';
  private readonly initialCart: CartDetails = {
    cartId: Math.floor(Math.random() * 100_000) + 1,
    products: [],
    quantity: 0,
    subtotal: 0,
    discountTotal: 0,
    total: 0,
  };
  cartDetails: WritableSignal<CartDetails> = signal(this.loadCart());
  constructor() { }

  updatePoductToCart(product: Product, action: ProductAction = ProductAction.ADD) {
    const current = this.cartDetails();
    const products = [...current.products];
    const existingIndex = products.findIndex((cartProduct) => cartProduct.id === product.id);

    if (action === ProductAction.ADD) {
      if (existingIndex >= 0) {
        const existing = products[existingIndex];
        const nextQuantity = Math.min(existing.addedQuantity + 1, product.stockQuantity);
        products[existingIndex] = this.mapToCartProduct(product, nextQuantity);
      } else {
        products.push(this.mapToCartProduct(product, 1));
      }
    } else {
      if (existingIndex < 0) {
        return;
      }
      const nextQuantity = products[existingIndex].addedQuantity - 1;
      if (nextQuantity <= 0) {
        products.splice(existingIndex, 1);
      } else {
        products[existingIndex] = this.mapToCartProduct(product, nextQuantity);
      }
    }

    this.setCart(products, current.cartId);
  }

  getProductQuantity(productId: number): number {
    return this.cartDetails().products.find((product) => product.id === productId)?.addedQuantity ?? 0;
  }

  clearCart() {
    this.setCart([], this.cartDetails().cartId);
  }

  private mapToCartProduct(product: Product, addedQuantity: number): CartProducts {
    const lineSubtotal = product.price * addedQuantity;
    const discountPercentage = product.discount ?? 0;
    const lineDiscount = lineSubtotal * (discountPercentage / 100);
    return {
      ...product,
      addedQuantity,
      lineSubtotal,
      lineDiscount,
      lineTotal: lineSubtotal - lineDiscount,
    };
  }

  private setCart(products: CartProducts[], cartId: number) {
    const quantity = products.reduce((sum, product) => sum + product.addedQuantity, 0);
    const subtotal = products.reduce((sum, product) => sum + product.lineSubtotal, 0);
    const discountTotal = products.reduce((sum, product) => sum + product.lineDiscount, 0);
    const total = subtotal - discountTotal;
    const nextCart: CartDetails = {
      cartId,
      products,
      quantity,
      subtotal,
      discountTotal,
      total,
    };
    this.cartDetails.set(nextCart);
    this.persistCart(nextCart);
  }

  private persistCart(cartDetails: CartDetails) {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(this.storageKey, JSON.stringify(cartDetails));
  }

  private loadCart(): CartDetails {
    if (typeof localStorage === 'undefined') {
      return this.initialCart;
    }
    const cartData = localStorage.getItem(this.storageKey);
    if (!cartData) {
      return this.initialCart;
    }
    try {
      const parsedCart = JSON.parse(cartData) as CartDetails;
      const products = (parsedCart.products ?? []).map((product) =>
        this.mapToCartProduct(product, product.addedQuantity)
      );
      const quantity = products.reduce((sum, product) => sum + product.addedQuantity, 0);
      const subtotal = products.reduce((sum, product) => sum + product.lineSubtotal, 0);
      const discountTotal = products.reduce((sum, product) => sum + product.lineDiscount, 0);
      return {
        ...this.initialCart,
        ...parsedCart,
        products,
        quantity,
        subtotal,
        discountTotal,
        total: subtotal - discountTotal,
      };
    } catch {
      return this.initialCart;
    }
  }
}
