import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';

import * as productActions from './product.actions';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Action } from '@ngrx/store';
//import all requried services or any dependencies

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService
        ) { }

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











}