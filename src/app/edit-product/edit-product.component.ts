import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  productData!: FormGroup;

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.productData = this.fb.group({
      id: [''],
      name: [''],
      price: [''],
      image: [''],
      Description: ['']  // Ensure the case of 'Description' matches the API response
    });

    console.log('this.actRoute.snapshot,params["id"]', this.actRoute.snapshot.params['id']);

    this.restApi.getProduct(this.id).subscribe((data: any) => {
      // Use patchValue to bind data to the form
      this.productData.patchValue(data);
    });
  }

  updateProduct() {
    if (window.confirm('Are you sure you want to update?')) {
      this.restApi.updateProduct(this.id, this.productData.value).subscribe(data => {
        console.log(data, 'data');
        this.router.navigate(['/product-list']);
      });
    }
  }
}
