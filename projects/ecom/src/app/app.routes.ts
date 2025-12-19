import { Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

export const routes: Routes = [
    {
        path:'', component: ProductListComponent
    },
    {
        path: 'product-detail/:id', component: ProductDetailsComponent
    }
];
