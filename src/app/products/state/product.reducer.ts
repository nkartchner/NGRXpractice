import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';
import { Statement } from '@angular/compiler';

// Putting this here instead of in the APP.STATE.TS allows the lazy loading feature to function correctly.
export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    // Storing the currentProduct ID is better practice! at least that's what I got from the video.
    // Here is the example that was shown:
    currentProductId: number | null;
    // Here is the example that was shown:
    products: Product[];
    error: string;
}



const initialState: ProductState = {
    showProductCode: true,
    // CurrentProductID is part of the example from the explanation above!
    currentProductId: null,
    // CurrentProductID is part of the example from the explanation above!
    products: [],
    error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);


export const getShowProductCode = createSelector(
    // The selector thats required to get the state is first
    getProductFeatureState,
    // Then returns the current request state
    state => state.showProductCode
);


export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {

        case ProductActionTypes.ToggleProductCode:
            return {
                // "..." is the "Spread Operator" which copies the existing object making the spread operator immutable
                ...state,
                showProductCode: action.payload
            };

        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId: action.payload.id
            };

        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            };

        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                // setting it to 0 to denote a new product
                currentProductId: 0
            };


        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products: action.payload,
                // We are setting the error to an empty string just in case we have a stale error hanging around
                error: ''
            };

        case ProductActionTypes.LoadFail:
            return {
                ...state,
                // setting the products to an empty array to handle the error
                products: [],
                error: action.payload
            };

        case ProductActionTypes.UpdateProductSuccess:

            const updatedProducts = state.products.map(
                // Check if the item we updated has the same ID as one of the items in the Products[] and replace it
                /* products.map(product => {
                 * we are using "MAP" makes a new array and throws each object in a new array with the exception of the updated product
                 * because "foreach" is mutable
                 * if (action.payload.id === product.id) {
                 *      product = action.payload
                 *      replace the updated object
                 * } else{
                 *      otherwise just stick the old object in there
                 * }
                 * })
                */
                product => action.payload.id === product.id ? action.payload : product
            );
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.payload.id,
                error: ''
            };

        case ProductActionTypes.UpdateProductFail:
            return {
                ...state,
                error: action.payload
            };

        case ProductActionTypes.CreateProductSuccess:
            return {
                ...state,
                products: [...state.products, action.payload],
                currentProductId: action.payload.id,
                error: ''
            };

        case ProductActionTypes.CreateProductFail:
            return {
                ...state,
                error: action.payload
            };

        case ProductActionTypes.DeleteProductSuccess:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
                currentProductId: null,
                error: ''
            };

        case ProductActionTypes.DeleteProductFail:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}
