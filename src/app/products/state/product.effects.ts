import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as productActions from './product.actions';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Action } from '@ngrx/store';

// this file handles all the Http requests and hands off the the actions file

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) { }


    @Effect()
    createProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.CreateProduct),
        map((action: productActions.CreateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.createProduct(product).pipe(
                map((newProduct: Product) => (new productActions.CreateProductSuccess(newProduct))),
                catchError(err => of(new productActions.CreateProductFail(err)))
            )
        )
    );


    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) =>
            this.productService.getProducts().pipe(
                map((products: Product[]) => (new productActions.LoadSuccess(products))),
                catchError(err => of(new productActions.LoadFail(err)))
            )
        )
    );


    @Effect()
    updateProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        // mergeMap to merge and flatten the products in the existing array
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map((updateProduct: Product) => (new productActions.UpdateProductSuccess(updateProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err))
                )
            )
        )
    );


    @Effect()
    deleteProduct$: Observable<Action> = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action: productActions.DeleteProduct) => action.payload),
        mergeMap((productId: number) =>
            this.productService.deleteProduct(productId).pipe(
                map(() => (new productActions.DeleteProductSuccess(productId))),
                catchError(err => of(new productActions.DeleteProductFail(err))
                )
            )
        )
    );

}
