import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product, ProductFilterState, ProductSortBy } from '../../models/products/products.model';
import { ProductCardComponent } from '../shared/product-card/product-card.component';
import { ProductsService } from '../../service/products.service';
import { MatButtonModule } from '@angular/material/button';
import { NavHeaderComponent } from "../shared/nav-header/nav-header.component";
import { MatInput, MatFormField, MatLabel } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProductCardComponent,
    MatButtonModule,
    NavHeaderComponent,
    MatInput,
    MatFormField,
    MatLabel,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductsService);
  readonly filters = signal<ProductFilterState>({
    searchTerm: '',
    category: 'all',
    inStockOnly: false,
    sortBy: 'featured',
  });
  readonly sortOptions: { label: string; value: ProductSortBy }[] = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'priceLowToHigh' },
    { label: 'Price: High to Low', value: 'priceHighToLow' },
    { label: 'Discount: High to Low', value: 'discountHighToLow' },
    { label: 'Name: A to Z', value: 'nameAToZ' },
  ];
  readonly allProducts = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly filteredProducts = computed(() =>
    this.productService.filterAndSortProducts(this.allProducts(), this.filters())
  );
  readonly categories = computed(() => [
    ...new Set(this.allProducts().map((product) => product.category)),
  ]);
  readonly productSummary = computed(() => {
    const allProducts = this.allProducts();
    const filteredProducts = this.filteredProducts();
    const inStock = filteredProducts.filter((product) => product.stockQuantity > 0).length;
    return {
      total: filteredProducts.length,
      inStock,
      outOfStock: filteredProducts.length - inStock,
      all: allProducts.length,
    };
  });

  ngOnInit(): void {
    this.fetchProducts();
  }

  updateSearch(searchTerm: string) {
    this.filters.update((currentFilter) => ({ ...currentFilter, searchTerm }));
  }

  updateCategory(category: string) {
    this.filters.update((currentFilter) => ({ ...currentFilter, category }));
  }

  updateSort(sortBy: ProductSortBy) {
    this.filters.update((currentFilter) => ({ ...currentFilter, sortBy }));
  }

  toggleStockFilter(inStockOnly: boolean) {
    this.filters.update((currentFilter) => ({ ...currentFilter, inStockOnly }));
  }

  clearFilters() {
    this.filters.set({
      searchTerm: '',
      category: 'all',
      inStockOnly: false,
      sortBy: 'featured',
    });
  }

  trackByProductId(_index: number, product: Product): number {
    return product.id;
  }

  private fetchProducts() {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.productService.getProductList().subscribe({
      next: (products) => {
        this.allProducts.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load products. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
