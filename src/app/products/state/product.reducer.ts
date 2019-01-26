import { Product } from '../product';
import * as fromRoot from '../../state/app.state'
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

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
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    //The selector thats required to get the state is first
    getProductFeatureState,
    // Then returns the current request state
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if(currentProductId === 0){
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
)



export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {

        case ProductActionTypes.ToggleProductCode:
            return {
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
                //setting it to 0 to denote a new product
                currentProductId: 0 
            };


        case ProductActionTypes.LoadSuccess:
            return {
                ...state,
                products: action.payload,
                // We are setting the error to an empty string just in case we have a stale error hanging around
                error: ''
            }

        case ProductActionTypes.LoadFail:
            return {
                ...state,
                //setting the products to an empty array to handle the error
                products: [],
                error: action.payload
            }

        default:
            return state;
    }
}