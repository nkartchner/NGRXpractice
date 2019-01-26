import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../product';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as productStore from '../../state';
import * as productActions from '../../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<productStore.State>) {}

  ngOnInit(): void {
    // Initiate the loading of the products list
    this.store.dispatch(new productActions.Load());
    // Grab the error messages. At the very least, this will be an empty string
    this.errorMessage$ = this.store.pipe(select(productStore.getError));
    // Grab the boolean value weather or not to show the product code
    this.displayCode$ = this.store.pipe(select(productStore.getShowProductCode));
    // Grab the products that have been loaded
    this.products$ = this.store.pipe(select(productStore.getProducts));
    // Grab the selected current product (just 1 can be selected at a time)
    this.selectedProduct$ = this.store.pipe(select(productStore.getCurrentProduct));
  }

  // No need to unsubscribe because we are using async pipes in the html!

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProduct(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  updateProduct(product: Product): void {
    this.store.dispatch(new productActions.UpdateProduct(product));
  }

  deleteProduct(product: Product): void {
    this.store.dispatch(new productActions.DeleteProduct(product.id));
  }

  saveProduct(product: Product): void {
    this.store.dispatch(new productActions.CreateProduct(product));
  }

  cancelEdit(): void {
    this.store.dispatch(new productActions.ClearCurrentProduct());
  }
}
