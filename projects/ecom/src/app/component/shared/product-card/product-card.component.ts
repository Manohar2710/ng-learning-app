import { Component, Input } from '@angular/core';
import { Products } from '../../../models/products/products.model';
import { MatCard, MatCardTitle, MatCardContent, MatCardHeader, MatCardActions } from "@angular/material/card";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatButton, MatCardHeader, MatCardActions],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() productDetails!: Products;
}
