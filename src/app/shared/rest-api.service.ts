import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { retry,catchError } from 'rxjs';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  //Define API
  apiURL ='http://localhost:3000'
  constructor(private http:HttpClient) { }
  httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json',
    }),
  };
  
  getProducts():Observable<Product>{
    return this.http
      .get<Product>(this.apiURL+'/products')
      .pipe(retry(1),catchError(this.handleError));
  }
  getProduct(id:any):Observable<Product>{
    return this.http
      .get<Product>(this.apiURL+'/products/' +id)
      .pipe(retry(1),catchError(this.handleError));
  }
  createProduct(product:any):Observable<Product>{
    return this.http
    .post<Product>(
      this.apiURL +'/products',
      JSON.stringify(product),
      this.httpOptions
    )
    .pipe(retry(1),catchError(this.handleError));
  }
  
  updateProduct(id:any,product:any): Observable <Product>{
    return this.http
    .put<Product>(
      this.apiURL+'/products/'+id,JSON.stringify(product),this.httpOptions)
      .pipe(retry(1),catchError(this.handleError));
  }

  deleteProduct(id:any){
    return this.http
    .delete<Product>(this.apiURL+'/products/'+id,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }

  handleError(error:any){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message;
    }
    else{
      errorMessage=`Error Code: ${error.status}\n Message: ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(()=>{
      return errorMessage
    })
  }

}
