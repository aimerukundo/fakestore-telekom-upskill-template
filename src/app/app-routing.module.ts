import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', 
    redirectTo: 'products', // Redirect to '/products' path
  },
  {
    path: 'products',
    component: HomeComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
