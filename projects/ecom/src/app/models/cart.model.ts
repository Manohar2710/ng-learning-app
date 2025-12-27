import { Product } from "./products/products.model";

export interface CartDetails {
    cartId?: number;
    products?: CartProducts[];
    quantity?: number
}

export interface CartProducts extends Product{
    addedQuantity: number;
}

export enum productAction {
    ADD,
    REMOVE
}