import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule,MatButtonModule],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.scss'
})
export class NavHeaderComponent {
    private routes = inject(Router);

    goToHome() {
    this.routes.navigate(['/'])
  }
}
