import { Injectable } from '@angular/core';
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
  cartDetails!: CartDetails;
  constructor() {}

  updatePoductToCart(product: Product, action?: ProductAction) {
    if (action == ProductAction.ADD) {
      const productFound = this.cartDetails?.products?.find(
        (product) => product.id === product.id
      );
      if (productFound) {
        productFound.addedQuantity = productFound?.addedQuantity + 1;
        this.cartDetails.quantity = this.cartDetails?.quantity ?? 0 + productFound.addedQuantity;
      } else {
        const cartProducts: CartProducts = {
          ...product,
          addedQuantity: 1,
        };
        this.cartDetails = {
          cartId: Math.floor(Math.random() * 100) + 1,
          products: [cartProducts],
          quantity: 1,
        };
      }
    } else {
      const productFound = this.cartDetails?.products?.find(
        (product) => product.id === product.id
      );
      productFound!.addedQuantity = productFound!.addedQuantity - 1;
      this.cartDetails.quantity = this.cartDetails?.quantity ?? 0 - productFound!.addedQuantity;
    }
  }
}
