import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PicaComponent } from './pica/pica.component';
import { RekvizitiComponent } from './rekviziti/rekviziti.component';
import { CartComponent } from './cart/cart.component';
import { AlkoholnaComponent } from './alkoholna/alkoholna.component';
import { BezalkoholnaComponent } from './bezalkoholna/bezalkoholna.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderComponent } from './order/order.component';
import { LoginGuard } from './guards/login.guard';
import { DetailsComponent } from './details/details.component';
import { ChangeProductComponent } from './change-product/change-product.component';
import { ChangeUserComponent } from './change-user/change-user.component';
import { ChangeAdminComponent } from './change-admin/change-admin.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { DetailsOrderComponent } from './details-order/details-order.component';
import { ChangeAboutComponent } from './change-about/change-about.component';
//import { ChangeAboutComponent } from './change-about/change-about.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'pica', component: PicaComponent},
  {path: 'bezalkoholna', component: BezalkoholnaComponent},
  {path: 'alkoholna', component: AlkoholnaComponent},
  {path: 'rekviziti', component: RekvizitiComponent},
  {path: 'login' , component: AuthComponent},
  {path: 'cart', component: CartComponent},
  {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'addAdmin' , component: AdminComponent, canActivate: [AuthGuard]},
  {path:'order', component:OrderComponent},//, canActivate:[LoginGuard]},
  {path:'change-user', component:ChangeUserComponent, canActivate:[LoginGuard]},
  {path: 'details/:id/:type', component: DetailsComponent},
  {path: 'change-product/:id/:type', component: ChangeProductComponent, canActivate:[AuthGuard]},
  {path:'change-admin', component:ChangeAdminComponent, canActivate:[AuthGuard]},
  {path:'all-orders', component: AllOrdersComponent, canActivate:[AuthGuard]},
  {path:'user-orders', component: UserOrdersComponent},
  {path:'change-about', component: ChangeAboutComponent, canActivate:[AuthGuard]},
  {path:'details-order/:id', component: DetailsOrderComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
