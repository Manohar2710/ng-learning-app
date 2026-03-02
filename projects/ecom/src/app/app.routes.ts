import { Routes } from '@angular/router';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    {
        path:'products', component: ProductListComponent
    },
    // redirectTo now can take function as input, ,which allows dynamic data option
    {
        path: '', redirectTo: 'products', pathMatch:'full' // full | prefix, prefix matches for any nested path , full matches the 
    },
    {
        path:'login', component: LoginComponent
    },
    {
        path: 'product-detail/:id', component: ProductDetailsComponent
    }
];
