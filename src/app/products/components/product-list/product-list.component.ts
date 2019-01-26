import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../product';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  pageTitle = 'Products';
  // Incoming
  @Input() errorMessage: string;
  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() selectedProduct: Product;
  // Outgoing
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Product>();
  // Outgoing emmissions
  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newProduct(): void {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.selected.emit(product);
  }
}
