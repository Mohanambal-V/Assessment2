import { Component } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
    Product:any=[];
    searchForm!:FormGroup;
    constructor(
      public restApi:RestApiService,
      private fb:FormBuilder,
      private route:Router){}
    ngOnInit(){
      this.searchForm=this.fb.group({
        searchText:[]
      })
      this.loadProducts();
    }
    onSearchTextChange(event:any){
      this.searchForm.controls['searchText'].valueChanges
      .pipe(debounceTime(200))
      .subscribe(()=>{
        if(this.searchForm.controls['searchText'].value.length>2){
          const searchedBooks=this.Product?.filter((b:any)=>b.name.toLowerCase().startsWith(event.target.value))
          this.Product=searchedBooks;
        }
        if(this.searchForm.controls['searchText'].value.length==0){
          this.Product=this.loadProducts();
        }
      })
    }
    redirectToEdit(id:any){
      this.route.navigate(['/edit-product/']+id)
    }
  
    loadProducts(){
      return this.restApi.getProducts().subscribe((data: {})=>{
        console.log('data',data);
        this.Product=data;
      });
    }
    deleteProduct(id:any){
      if(window.confirm('Are you sure, you want to delete')){
        this.restApi.deleteProduct(id).subscribe((data)=>{
          this.loadProducts();
        });
      }
    }
}