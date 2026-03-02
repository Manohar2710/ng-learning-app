import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatBadgeModule, CurrencyPipe],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss',
})
export class NavHeaderComponent {
  private routes = inject(Router);
  private cartService = inject(CartService);
  readonly cartItemCount = computed(() => this.cartService.cartDetails().quantity);
  readonly cartTotal = computed(() => this.cartService.cartDetails().total);

  goToHome() {
    this.routes.navigate(['/products']);
  }

  goToLogin() {
    this.routes.navigate(['/login']);
  }
}
