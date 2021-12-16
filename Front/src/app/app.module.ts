import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { LogoComponent } from './components/layout-area/logo/logo.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { PleaseWaitComponent } from './components/shared-area/please-wait/please-wait.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AdminComponent } from './components/admin-area/admin/admin.component';
import { CategoryListComponent } from './components/category-area/category-list/category-list.component';
import { CategoryCardComponent } from './components/category-area/category-card/category-card.component';
import { ProductsPerCategoryComponent } from './components/products-area/products-per-category/products-per-category.component';
import { AvailableProductsComponent } from './components/products-area/available-products/available-products.component';
import { OrdersSubmittedComponent } from './components/order-area/orders-submitted/orders-submitted.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StartResumeComponent } from './components/layout-area/start-resume/start-resume.component';
import { MatSelectModule } from '@angular/material/select';
import { CartMenuComponent } from './components/cart-area/cart-menu/cart-menu.component';
import { CartRightComponent } from './components/cart-area/cart-right/cart-right.component';
import { OrderSubmitComponent } from './components/order-area/order-submit/order-submit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RightComponent } from './components/layout-area/right/right.component'; // for datepiker to work with reactive form
import { MatDialogModule } from '@angular/material/dialog';
import { IgxSplitterModule } from 'igniteui-angular';
import { SearchProductComponent } from './components/products-area/search-product/search-product.component';
import { SearchResultsComponent } from './components/products-area/search-results/search-results.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { OrderUnitsDialogComponent } from './components/order-area/order-units-dialog/order-units-dialog.component';
import { OrderSuccessDialogComponent } from './components/order-area/order-success-dialog/order-success-dialog.component';
import { ItemCardComponent } from './components/cart-area/item-card/item-card.component';
import { TotalCartComponent } from './components/cart-area/total-cart/total-cart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { MatToolbarModule } from '@angular/material/toolbar';




//I keep the new line
@NgModule({
	declarations: [
		LayoutComponent,
		HeaderComponent,
		FooterComponent,
		MenuComponent,
		LogoComponent,
		HomeComponent,
		ProductListComponent,
		Page404Component,
		ProductCardComponent,
		AddProductComponent,
		PleaseWaitComponent,
		UpdateProductComponent,
		RegisterComponent,
		LoginComponent,
		LogoutComponent,
		AuthMenuComponent,
		AdminComponent,
		CategoryListComponent,
		CategoryCardComponent,
		ProductsPerCategoryComponent,
		AvailableProductsComponent,
		OrdersSubmittedComponent,
		StartResumeComponent,
		// CitiesComponent,
		CartMenuComponent,
		OrderSubmitComponent,
		RightComponent,
		OrderUnitsDialogComponent,
		OrderSuccessDialogComponent,
  		SearchProductComponent,
  		SearchResultsComponent,
    	HighlightPipe,
    	ItemCardComponent,
     	TotalCartComponent,
		CartRightComponent
	],
	entryComponents: [OrderUnitsDialogComponent, OrderSuccessDialogComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		NgbModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatDialogModule,
		IgxSplitterModule,
		MatSidenavModule,
		MatFileUploadModule, // didnt use - delete module
		MatToolbarModule // ddin't use
	],

	// Tell Angular to create a DI object from ArrayService for the entire app: 
	// providers: [ArrayService],

	// Register the interceptor so any request will invoke it: 
	providers: [{
		provide: HTTP_INTERCEPTORS,
		useClass: JwtInterceptor,
		multi: true // Can register it several times if needed
	}],

	bootstrap: [LayoutComponent]
	// bootstrap: [LayoutComponent, UnitsDialogComponent, SuccessDialogComponent]

})
export class AppModule {
}
