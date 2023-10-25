import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinner } from './Shared/Loading Spinner/LoadingSpinner.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RekvizitiComponent } from './rekviziti/rekviziti.component';
import { PicaComponent } from './pica/pica.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { AlkoholnaComponent } from './alkoholna/alkoholna.component';
import { BezalkoholnaComponent } from './bezalkoholna/bezalkoholna.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdministratorCompComponent } from './components/Administrator/administrator-comp/administrator-comp.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminComponent } from './admin/admin.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { OrderComponent } from './order/order.component';
import { SortPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DetailsComponent } from './details/details.component';
import { ChangeProductComponent } from './change-product/change-product.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { DetailsService } from './services/details.service';
import { ChangeAdminComponent } from './change-admin/change-admin.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { DetailsOrderComponent } from './details-order/details-order.component';
import { ChangeAboutComponent } from './change-about/change-about.component';
import { NgToastModule } from 'ng-angular-popup';
//import { ChangeAboutComponent } from './change-about/change-about.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinner,
    HeaderComponent,
    HomeComponent,
    RekvizitiComponent,
    PicaComponent,
    AboutComponent,
    CartComponent,
    AlkoholnaComponent,
    BezalkoholnaComponent,
    PageNotFoundComponent,
    AddProductComponent,
    PageNotFoundComponent,
    AdministratorCompComponent,
    NavBarComponent,
    AdminComponent,
    OrderComponent,
    SortPipe,
    FilterPipe,
    DetailsComponent,
    ChangeProductComponent,
    ChangeUserComponent,
    ChangeAdminComponent,
    AllOrdersComponent,
    UserOrdersComponent,
    DetailsOrderComponent,
    ChangeAboutComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true},
             HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
