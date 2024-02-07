import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {path:'',redirectTo:'product-list',pathMatch:'full'},
  {path:'create-product',component:CreateProductComponent},
  {path:'edit-product/:id',component:EditProductComponent},
  {path:'product-list',component:ProductListComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
