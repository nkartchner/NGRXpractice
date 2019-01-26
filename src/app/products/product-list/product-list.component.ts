import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as productStore from '../state/product.reducer'
import * as productActions from '../state/product.actions'
import { takeWhile } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  componentActive:boolean = true;

  displayCode: boolean;

  products: Product[];

  //Used to highlight the selected product in the list
  currentProduct: Product | null;
  products$: Observable<Product[]>;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<productStore.State>,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(productStore.getCurrentProduct)).subscribe(
      currentProduct => this.currentProduct = currentProduct
    );
    // Grabbing all error messages. If there are none, there should be just an empty string
    this.errorMessage$ = this.store.pipe(select(productStore.getError))
    // Requesting the data be loaded
    this.store.dispatch(new productActions.Load());
    // Grabbing the data if all was successfull
    this.products$ = this.store.pipe(select(productStore.getProducts));
      
    //////////////////////////////////// THIS IS A WAY TO SUBSCRIBE ////////////////////////////////////
    //////////////////////////////////// THIS WAY IS MORE FOR THE EDIT FORM ////////////////////////////////////
    // this.store.pipe(
    //   select(productStore.getProducts),
    //   takeWhile(() => this.componentActive))
    //     .subscribe((products:Product[]) => this.products = products)


    this.store.pipe(select(productStore.getShowProductCode)).subscribe(
      showProductCode => this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProduct(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
