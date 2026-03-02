import { Product } from "./products/products.model";

export interface CartDetails {
    cartId: number;
    products: CartProducts[];
    quantity: number;
    subtotal: number;
    discountTotal: number;
    total: number;
}

export interface CartProducts extends Product{
    addedQuantity: number;
    lineSubtotal: number;
    lineDiscount: number;
    lineTotal: number;
}

export enum productAction {
    ADD,
    REMOVE
}
