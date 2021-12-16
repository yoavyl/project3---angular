import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { AdminGuard } from './services/admin.guard';
import { ProductsPerCategoryComponent } from './components/products-area/products-per-category/products-per-category.component';
import { OrderSubmitComponent } from './components/order-area/order-submit/order-submit.component';
import { SearchResultsComponent } from './components/products-area/search-results/search-results.component';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "logout", component: LogoutComponent },
    { path: "products", canActivate: [AuthGuard] ,component: ProductListComponent },
    { path: "order", canActivate: [AuthGuard], component: OrderSubmitComponent },
    { path: "categories/:id", canActivate: [AuthGuard] , component: ProductsPerCategoryComponent },
    { path: "products/edit/:id", component: UpdateProductComponent },
    { path: "products/:queryParams", canActivate: [AuthGuard], component: SearchResultsComponent },
    { path: "admin", canActivate: [AdminGuard], component: AdminComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },  
    { path: "**", component: Page404Component }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
