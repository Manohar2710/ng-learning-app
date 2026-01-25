import { Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    {
        path:'products', component: ProductListComponent
    },
    {
        path:'login', component: LoginComponent
    },
    {
        path: 'product-detail/:id', component: ProductDetailsComponent
    }
];
